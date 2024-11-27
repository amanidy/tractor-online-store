import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function POST(req: NextApiRequest) {
    const { tractorId, name, email, message } = req.body;
    try {
        const newInquiry = await prisma.inquiry.create({
          data: {
            tractorId,
            name,
            email,
            message,
          },
        });
     }
    catch (error) {
        console.error(error);
         return NextResponse.json(
           { error: "Failed to create inquiry" },
           { status: 500 }
         );
    }

}

async function GET() {
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