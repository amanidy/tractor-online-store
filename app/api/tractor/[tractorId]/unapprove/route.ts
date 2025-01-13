import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function PATCH(
  req: Request,
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
        sellerId: userId,
      }
    });

    if (!tractor) {
      return new NextResponse("Not found", { status: 404 });
    }

    

    

    const unapprovedCourse = await db.tractor.update({
      where: {
        id: tractorId,
        sellerId: userId,
      },
      data: {
        isApproved: false,
      },
    });

    return NextResponse.json(unapprovedCourse);
  } catch (error) {
    console.log("[TRACTOR_ID_UNAPPROVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
