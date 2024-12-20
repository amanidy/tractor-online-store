import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

interface Params {
  params: { tractorId: string; attachmentId: string };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tractorId, attachmentId } = params;

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        tractorId: tractorId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("ATTACHMENT_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
