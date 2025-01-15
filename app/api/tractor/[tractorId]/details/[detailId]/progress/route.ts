
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteParams {
  params: {
    tractorId: string;
    detailId: string;
  };
}

export async function PUT(
  req: Request,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { detailId } = params;

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_detailId: {
          userId,
          detailId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        detailId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}