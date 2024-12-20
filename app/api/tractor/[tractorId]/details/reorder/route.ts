import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: Request, { params }: any): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
      const { tractorId } = params;

    const { list } = await req.json();

    const sellerOwner = await db.tractor.findUnique({
      where: {
        id: tractorId,
        sellerId: userId,
      },
    });

    if (!sellerOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (const item of list) {
      await db.detail.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}