import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import {Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public", "uploads", "tractors");

export async function GET(req: NextRequest) {
  try {
    
    const searchParams = req.nextUrl.searchParams;

    
    const searchTerm = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const location = searchParams.get("location");
    const make = searchParams.get("make");

   
    const whereClause: Prisma.TractorWhereInput = {};

    
    if (searchTerm) {
      whereClause.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { location: { contains: searchTerm, mode: "insensitive" } },
        { specifications: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

   
    if (minPrice) {
      whereClause.price = {
        gte: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      if (whereClause.price) {
        
        (whereClause.price as Prisma.FloatFilter).lte = parseFloat(maxPrice);
      } else {
        
        whereClause.price = {
          lte: parseFloat(maxPrice),
        };
      }
    }

    
    if (location) {
      whereClause.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    
    if (make) {
      whereClause.title = {
        startsWith: make,
        mode: "insensitive",
      };
    }

    
    const tractors = await prisma.tractor.findMany({
      where: whereClause, // Ensure whereClause is defined based on your use case
      include: {
        seller: {
          select: {
            name: true,
          },
        },
        inquiries: true, 
        sales: true, 
      },
    });


    return NextResponse.json(tractors);
  } catch (error) {
    console.error("Fetch tractors error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    // Create uploads directory
    await mkdir(uploadDir, { recursive: true });

    // Parse form data
    const formData = await req.formData();

    // Extract form fields
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const location = formData.get("location");
    const specifications = formData.get("specifications");
    const history = formData.get("history");
    const userId = formData.get("userId");

    // Validate required fields
    const requiredFields = [
      { name: "title", value: title },
      { name: "description", value: description },
      { name: "price", value: price },
      { name: "location", value: location },
      { name: "specifications", value: specifications },
      { name: "userId", value: userId },
    ];

    const missingFields = requiredFields
      .filter((field) => !field.value)
      .map((field) => field.name);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields: missingFields,
        },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId as string) },
      select: { id: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Handle image uploads
    const images: string[] = [];
    const imageFiles = formData.getAll("images") as File[];

    for (const file of imageFiles) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);

        // Write file to uploads directory
        await writeFile(filepath, buffer);
        images.push(`/uploads/tractors/${filename}`);
      }
    }

    // Create tractor listing
    const newTractor = await prisma.tractor.create({
      data: {
        title: title as string,
        description: description as string,
        price: parseFloat(price as string),
        location: location as string,
        specifications: specifications as string,
        history: (history || "") as string,
        images,
        sellerId: user.id,
      },
    });

    // Create activity log for admin dashboard
    await prisma.adminActivityLog.create({
      data: {
        type: "TRACTOR_LISTING_CREATED",
        description: `New tractor listing created by ${user.name}`,
        details: JSON.stringify({
          tractorId: newTractor.id,
          tractorTitle: newTractor.title,
          sellerId: user.id,
          sellerName: user.name,
          price: newTractor.price,
          location: newTractor.location,
        }),
        timestamp: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Tractor listing created successfully",
        tractor: newTractor,
      },
      { status: 201 }
    );
  } catch (error) {
    // Error handling
    if (error instanceof Error) {
      console.error("Tractor creation error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      console.error("Unexpected error during tractor creation:", error);
    }

    return NextResponse.json(
      {
        error: "An error occurred while creating the listing",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
