import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(
    req: Request,
    {params}:{params:{tractorId:string}}
) {
    try {
        const { userId } = await auth();
        const { title } = await req.json();


        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }

        const sellerOwner = await db.tractor.findUnique({
            where: {
                id: params.tractorId,
                sellerId:userId,
            }
        });
        
         if (!sellerOwner) {
           return new NextResponse("Unauthorized", { status: 401 });
         }

        const lastDetail = await db.detail.findFirst({
            where: {
                tractorId: params.tractorId,
            },
            orderBy: {
                position:"desc",
            }
        });

        const newPosition = lastDetail ? lastDetail.position + 1 : 1;

        const detail = await db.detail.create({
            data: {
                title,
                tractorId: params.tractorId,
                position: newPosition,
            }
        });


        return NextResponse.json(detail);


        
    } catch(error) {
        console.log("[DETAILS]", error);
        return new NextResponse("Internal Error",{status:500})
    }
}