import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(
    req: Request,
    {params}:{params:{tractorId:string}}
) {
    try {
        const { userId } = await auth();
        const {url} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status:401})
        }


        const tractorSeller = await db.tractor.findUnique({
            where: {
                id: params.tractorId,
                sellerId: userId,
            }
        });


        if (!tractorSeller) {
             return new NextResponse("Unauthorized", { status: 401 });
        }
          
        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                tractorId: params.tractorId,
            }
        });

        return NextResponse.json(attachment);

        
    } catch(error) {
        console.log("TRACTOR_ID_ATTACHMENTS", error);
        return new NextResponse("Internal server error",{status:500})
    }
    
}