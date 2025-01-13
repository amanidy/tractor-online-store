import { auth } from "@clerk/nextjs/server";
import { Detail, Tractor, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
//import { db } from "../../../../../lib/db";
import { TractorSidebarItem } from "./tractor-sidebar-item";
import { TractorProgress } from "@/components/tractor-progress";

interface TractorSidebarProps{
    tractor: Tractor & {
        details: (Detail & {
            UserProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;

}


export const TractorSidebar = async({
    tractor,
    progressCount,
}: TractorSidebarProps) => {
    
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    {/* const purchase = await db.purchase.findUnique({
        where: {
            userId_tractorId: {
                userId,
                tractorId: tractor.id
            }
        }
    }); */}





    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm ">
            <div className="p-8 fle flex-col border-b ">
                <h1 className="font-semibold">
                    {tractor.title}
                </h1>
                    <div className="mt-10">
                        <TractorProgress
                            variant="success"
                            value={progressCount}
                        />
                    </div>
                
            </div>
            <div className="flex flex-col w-full ">
                {tractor.details.map((detail) => (
                    <TractorSidebarItem
                        key={detail.id}
                        id={detail.id}
                        label={detail.title}
                        isCompleted={!!detail.UserProgress?.[0]?.isCompleted}
                        tractorId={tractor.id}
                        
                    />
             ))}
            </div>

        </div>
    )
}