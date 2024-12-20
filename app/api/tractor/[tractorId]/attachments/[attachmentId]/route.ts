import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

interface RouteParams {
  params: {
    tractorId: string;
    attachmentId: string;
  };
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { params } = context;

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: params.tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        tractorId: params.tractorId,
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("ATTACHMENT_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
