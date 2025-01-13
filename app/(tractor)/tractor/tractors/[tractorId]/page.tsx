import { db } from "@/lib/db";
import { redirect } from "next/navigation";


const TractorIdPage = async ({
     params
}:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
): Promise<JSX.Element> => {
    
    const tractorId = params;

    const tractor = await db.tractor.findUnique({
        where: {
            id: tractorId,
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

    return redirect(`/tractor/tractors/${tractor.id}/details/${tractor.details[0].id}`);
}
 
export default TractorIdPage;