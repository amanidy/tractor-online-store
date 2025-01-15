import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { isSeller } from "@/lib/seller";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId || !isSeller(userId)) {
      console.error("Unauthorized: No user ID found.");
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clerkUser = await(await clerkClient()).users.getUser(userId);

    

    let user = await db.user.findUnique({
      where: { id: userId },
    });

    
    if (!user) {
  user = await db.user.create({
    data: {
      id: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: clerkUser.fullName || clerkUser.username || "Unknown User",
      role: 'SELLER', 
      password: '',
      userrole:"ADMIN"
    },
  });
}


    const data = await req.json();
    console.log("Received data:", data);

    const { title } = data;

    if (!title) {
      return new NextResponse(JSON.stringify({ error: "Title is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const tractor = await db.tractor.create({
      data: {
        sellerId: userId,
        title,
      },
    });

    return new NextResponse(JSON.stringify(tractor), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[TRACTORS_ERROR]", error);

    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? `Internal Error: ${error.message}`
            : "Internal Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
