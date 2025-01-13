
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";


const testMuxConfig = {
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
};

console.log("Config Test:", testMuxConfig);


const muxClient = new Mux(testMuxConfig);

export const runtime = "nodejs";

console.log("ENV CHECK:", {
  MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
  HAS_SECRET: !!process.env.MUX_TOKEN_SECRET,
});


export async function DELETE(req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
): Promise<NextResponse> { 

  try {

    const { userId } = await auth();

    const { tractorId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const tractor = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId:userId,
      },
      include: {
        details: {
          include: {
            muxData:true,
          }
        }
      }
    })

    if (!tractor) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const detail of tractor.details) {
      if (detail.muxData?.assetId) {
        await muxClient.video.assets.delete(detail.muxData.assetId)
      }
    }


    const deletedTractor = await db.tractor.delete({
      where: {
        id: tractorId,
      },
    });


    return NextResponse.json(deletedTractor);

    
  } catch (error) {
    console.log("[TRACTOR_ID_DELETE]", error);

    return new NextResponse("Interna error", { status: 500 });
    
  }
}


export async function PATCH(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
): Promise<NextResponse> {
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
      },
    });

    return NextResponse.json(tractor);
  } catch (error) {
    console.log("[TRACTOR_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
