import { db } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
    params: Promise<{
        tractorId: string;
    }>;
}

const TractorIdPage = async ({ params }: PageProps) => {

    const {tractorId} = await params;
    console.log("tractorId",tractorId);
    
    const { userId } = await auth();
    
    if (!userId) {
        return redirect("/sign-in");
    }

    if (!tractorId) {
        return redirect("/");
    }

    try {
        const tractor = await db.tractor.findUnique({
            where: {
                id: tractorId,
                sellerId:userId
            },
            include: {
                details: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        position: "asc",
                    }
                }
            }
        });

        if (!tractor) {
            return redirect("/");
        }

        if (!tractor.details.length) {
            return redirect("/");
        }

        const firstDetailId = tractor.details[0].id;
        return redirect(`/tractor/tractors/${tractor.id}/details/${firstDetailId}`);
        
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.digest?.includes('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Error fetching tractor:", error);
        return redirect("/");
    }
}

export default TractorIdPage;
