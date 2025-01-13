import { db } from "@/lib/db";
import { Category, Detail, Tractor } from "@prisma/client";
import { getProgress } from "./get-progress";

type tractorsWithProgressWithCategory = Tractor & {
    category: Category;
    details: Detail[];
    progress: number | null;

}


type DashboardTractors = {
    completedViewedTractors: tractorsWithProgressWithCategory[];
    tractorsInViewProgress: tractorsWithProgressWithCategory[];
};

export const getDashboardTractors = async (userId: string): Promise<DashboardTractors> => {

    try {

        const purchasedTractors = await db.purchase.findMany({
            where: {
                userId: userId,
            },
            select: {
                tractor: {
                    include: {
                        category: true,
                        details: {
                            where: {
                                isPublished:true,
                            }
                        }
                    }
                }
            }
        });

        const tractors = purchasedTractors.map((purchase) => purchase.tractor) as tractorsWithProgressWithCategory[];

        for (const tractor of tractors) {
            const progress = await getProgress({
              userId,
              tractorId: tractor.id,
            });
            tractor["progress"] = progress;
        };

        const completedViewedTractors = tractors.filter((tractor) => tractor.progress === 100);
        const tractorsInViewProgress = tractors.filter(
          (tractor) => (tractor.progress ?? 0) < 100
        );

        return {
            completedViewedTractors,
            tractorsInViewProgress
        }

        
    } catch (error) {
        
        console.log("[GET_DASHBOARD_TRACTORS]", error);
        return {
          completedViewedTractors: [],
          tractorsInViewProgress: [],
        };
        
    }

}