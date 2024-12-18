import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function PATCH(
    req: Request,
    {params}:{params :{tractorId:string}}
) {
    try {
        const { userId } = await auth();
        const { tractorId } = params;

        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tractor = await db.tractor.update({
          where: {
            id: tractorId,
            sellerId: userId,
            },
            
                data: {
                    ...values,
                }
            
        });

        return NextResponse.json(tractor);
        
    } catch (error) {
        console.log("[TRACTOR_ID]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
    
}