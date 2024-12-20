import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function DELETE(
  request: Request,
  context: {
    params: {
      tractorId: string;
      attachmentId: string;
    };
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: context.params.tractorId,
        sellerId: userId,
      },
    });
    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        tractorId: context.params.tractorId,
        id: context.params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
