import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request, { params }: any): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId ) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

      const { tractorId } = params;
      
      
    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastDetail = await db.detail.findFirst({
      where: {
        tractorId: tractorId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastDetail ? lastDetail.position + 1 : 1;

    const detail = await db.detail.create({
      data: {
        title,
        tractorId: tractorId,
        position: newPosition,
      },
    });

    return NextResponse.json(detail);
  } catch (error) {
    console.log("[DETAILS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}