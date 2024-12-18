import { PrismaClient,UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, role } = await req.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        userrole: (role?.toUpperCase() as UserRole) || UserRole.SELLER,
        role: role || "seller",
      },
    });

    
    const redirectPath = user.role === "seller" ? "/seller" : "/pages/tractors";

    
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        redirectPath,
      },
      { status: 201 }
    );
  } catch (error) {
    
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Email or phone already in use" },
          { status: 400 }
        );
      }
    }

    
    console.error(
      "Registration error:",
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma client is disconnected
    await prisma.$disconnect();
  }
}
