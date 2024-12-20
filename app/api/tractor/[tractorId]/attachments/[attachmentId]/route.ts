import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function DELETE(
  req: Request,
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
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { tractorId, attachmentId } = context.params;

    const sellerOwner = await db.tractor.findUnique({
      where: { id: tractorId, sellerId: userId },
    });

    if (!sellerOwner) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: { tractorId, id: attachmentId },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("Error deleting attachment:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
