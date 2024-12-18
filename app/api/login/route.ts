import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

   
    const user = await prisma.user.findUnique({
      where: { email },
    });

    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const redirectPath = user.role === "seller" ? "/seller" : "/pages/tractors";
      
    return NextResponse.json(
      {
        message: "Login successful",
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
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Ensure to disconnect Prisma client to prevent connection leaks
    await prisma.$disconnect();
  }
}
