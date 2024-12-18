import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function PUT(
    req: Request,
    {params}:{params:{tractorId:string}}

) {

    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const { list } = await req.json();



        const sellerOwner = await db.tractor.findUnique({
            where: {
                id: params.tractorId,
                sellerId: userId,
            }
        });
         
        if (!sellerOwner) {
          return new NextResponse("Unauthorized", { status: 401 });
        }


        for (const item of list) {
            await db.detail.update({
                where: {
                    id:item.id
                },
                data: {
                    position : item.position
                }
            })
            
        }

        return new NextResponse("Success",{status:200})

        
    } catch(error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
    
}