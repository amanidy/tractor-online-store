
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";



export async function PUT(
    req: Request,
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {params}:any
): Promise<NextResponse> {
    
    try {
        const { userId } = await auth();
        const { isCompleted } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //const tractorId = params;
        const detailId = params;

        const UserProgress = await db.userProgress.upsert({
            where: {
                userId_detailId: {
                    userId,
                    detailId: detailId,
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                detailId: detailId,
                isCompleted,
            }
        });

        return NextResponse.json(UserProgress);
        
    } catch (error) {
        
        console.log("[PROGRESS]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}