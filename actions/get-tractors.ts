import { Category, Tractor } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "../app/lib/db";

type TractorWithProgressWithCategory = Tractor & {
  category: Category | null;
  details: { id: string }[];
  progress: number | null;
};

type GetTractors = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getTractors = async ({
  userId,
  title,
  categoryId,
}: GetTractors): Promise<TractorWithProgressWithCategory[]> => {
  try {
    const tractors = await db.tractor.findMany({
      where: {
        isApproved: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        details: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const tractorsWithProgress: TractorWithProgressWithCategory[] =
      await Promise.all(
        tractors.map(async (tractor) => {
          if (tractor.purchases.length === 0) {
            return {
              ...tractor,
              progress: null,
            };
          }

          const progressPercentage = await getProgress({
            userId,
            tractorId: tractor.id,
          });

          return {
            ...tractor,
            progress: progressPercentage,
          };
        })
      );

    return tractorsWithProgress;
  } catch (error) {
    console.log("[GET_TRACTORS]", error);
    return [];
  }
};
