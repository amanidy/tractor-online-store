import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";



const testMuxConfig = {
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
};

console.log("Config Test:", testMuxConfig);

// Then create your client
const muxClient = new Mux(testMuxConfig);


export const runtime = "nodejs";


console.log("ENV CHECK:", {
  MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
  HAS_SECRET: !!process.env.MUX_TOKEN_SECRET,
});


{
  /*  const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});*/
} 


export async function DELETE(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {params} :any
): Promise<NextResponse>{

  try {
    const { userId } = await auth();

    
  if (!userId) {
  return new NextResponse("Unauthorized", { status: 401 });
}

    const { tractorId, detailId } = params;

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const detail = await db.detail.findUnique({
      where: {
        id: detailId,
        tractorId: tractorId,
      }
    });

    if (!detail) {
      return new NextResponse("Not Found",{status:404})
    }

    if (detail.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          detailId: detailId
        }
      });

      if (existingMuxData) {
        await muxClient.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id:existingMuxData.id,
          }
        })
      }
    }

    const deletedDetail = await db.detail.delete({
      where: {
        id:detailId,
      }
    })

    const publishedDetailsInTractor = await db.detail.findMany({
      where: {
        tractorId: tractorId,
        isPublished: true,
      }
    });

    if (!publishedDetailsInTractor.length) {
      await db.detail.update({
        where: {
          id: tractorId,
          
        },
        data: {
          isPublished:false,
        }
      })
    }

    return NextResponse.json(deletedDetail);
    
  } catch (error) {
    console.log("[DETAIL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }


  
}


interface RouteParams {
  params: {
    tractorId: string;
    detailId: string;
  };
}

export async function PATCH(
  req: Request,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tractorId, detailId } = params;

    if (!tractorId || !detailId) {
      return new NextResponse("Missing required parameters", { status: 400 });
    }

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const detail = await db.detail.update({
      where: {
        id: detailId,
        tractorId: tractorId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          detailId: detailId,
        },
      });

      if (existingMuxData) {
        await muxClient.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await muxClient.video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          detailId: detailId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(detail);
  } catch (error) {
    console.log("[DETAIL_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}