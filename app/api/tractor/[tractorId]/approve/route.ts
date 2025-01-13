import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function PATCH(
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {params}:any
): Promise<NextResponse> {

    try {

        const { userId } = await auth();
        const { tractorId } = params;

        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }

        const tractor = await db.tractor.findUnique({
            where: {
                id: tractorId,
                sellerId: userId
            },
            include: {
                details: {
                    include: {
                        muxData:true,
                    }
                }
            }
        });



        if (!tractor) {
            return new NextResponse("Not found", { status: 404});
        }

        const hasPublishedDetail = tractor.details.some((detail) => detail.isPublished);

        if (!tractor.title || !tractor.description || !tractor.imageUrl || !tractor.categoryId || !hasPublishedDetail) {
            return new NextResponse("Missing required fields", { status: 401 });
        }

        const approvedCourse = await db.tractor.update({
            where: {
                id: tractorId,
                sellerId: userId
            },
            data: {
                isApproved: true,
            }
        });

        return NextResponse.json(approvedCourse);
        
    } catch (error) {  
        console.log("[TRACTOR_ID_APPROVE]", error)
        return new NextResponse("Internal Error",{status:500})
        
    }
    
}