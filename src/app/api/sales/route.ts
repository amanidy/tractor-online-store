

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const { tractorId, buyerName, price } = await req.json();

  
  if (!tractorId || !buyerName || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  try {
    const newSale = await prisma.sale.create({
      data: {
        tractorId,
        buyerName,
        price: parseFloat(price.toString()), 
      },
    });
    return NextResponse.json({ newSale }, { status: 201 });
  } catch (error) {
    console.error("Error creating sale:", error);
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const sales = await prisma.sale.findMany();
    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}
