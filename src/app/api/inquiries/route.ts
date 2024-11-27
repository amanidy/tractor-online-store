import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const { tractorId, name, email, message } = await req.json(); 
  try {
    const newInquiry = await prisma.inquiry.create({
      data: {
        tractorId,
        name,
        email,
        message,
      },
    });
    return NextResponse.json({ newInquiry }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany();
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
