import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";


const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: Request,
  { params }: { params: { tractorId: string; detailId: string } }
) {
  try {
    const { userId } = await auth();
    const { ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: params.tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const detail = await db.detail.update({
      where: {
        id: params.detailId,
        tractorId: params.tractorId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          detailId: params.detailId,
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
          detailId: params.detailId,
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
