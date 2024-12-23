import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function PATCH(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
): Promise<NextResponse> {
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
      },
    });

    if (!detail) {
      return new NextResponse("Detail not found", { status: 404 });
    }

    // Fixed validation logic
    if (!detail.title || !detail.description || !detail.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedDetail = await db.detail.update({
      where: {
        id: detailId,
        tractorId: tractorId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedDetail);
  } catch (error) {
    console.log("[DETAIL_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
