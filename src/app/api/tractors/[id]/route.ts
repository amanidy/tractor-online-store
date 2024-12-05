import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const tractor = await prisma.tractor.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });

    return NextResponse.json(tractor);
  } catch (error) {
    console.error("Approve tractor error:", error);
    return NextResponse.json(
      { message: "Failed to approve tractor", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    // Validate the ID
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid tractor ID" },
        { status: 400 }
      );
    }

    const deletedTractor = await prisma.tractor.delete({
      where: { id },
    });

    return NextResponse.json(deletedTractor);
  } catch (error) {
    console.error("Delete tractor error:", error);

    // Check if it's a Prisma "Not Found" error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Tractor not found" },
          { status: 404 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        message: "Failed to remove tractor",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}