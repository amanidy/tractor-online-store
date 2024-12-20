
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface FilterConditions {
  dealerType?: "TractorParts" | "EquipmentSupplier";
  OR?: Array<{
    name?: { contains: string; mode?: "insensitive" };
    description?: { contains: string };
    specialties?: { has: string }; 
  }>;
}

interface Product {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export async function GET(req:NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        const search = searchParams.get("search") || "";
        const type = searchParams.get("type") || "All";
        const page = Number(searchParams.get("page")) || 1;
        const pageSize = Number(searchParams.get("pageSize")) || 12;

        const filterConditions: FilterConditions = {};
        if (type !== "All") {
          filterConditions.dealerType =
            type === "Tractor Parts" ? "TractorParts" : "EquipmentSupplier";
        }

        
        if (search) {
          filterConditions.OR = [
            {
              name: {
                contains: search.toString(),
                mode: "insensitive",
              },
            },
            {
              specialties: {
                has: search.toString(),
              },
            },
          ];
        }

        
        const dealers = await prisma.dealer.findMany({
          where: filterConditions,
          include: {
            products: {
              take: 4, 
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          take: Number(pageSize),
          skip: (Number(page) - 1) * Number(pageSize),
          orderBy: {
            rating: "desc",
          },
        });

        
        const totalDealers = await prisma.dealer.count({
          where: filterConditions,
        });

        NextResponse.json({
          dealers,
          pagination: {
            currentPage: Number(page),
            pageSize: Number(pageSize),
            totalDealers,
            totalPages: Math.ceil(totalDealers / Number(pageSize)),
          },
        });

    } catch (error) {
        console.error("Error fetching dealers:", error)
        NextResponse.json({
          error: "Unable to fetch dealers",
          details: error instanceof Error ? error.message : "Unknown error",
        });
        
    }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      location,
      contactEmail,
      contactPhone,
      dealerType,
      specialties,
      products,
      userId,
    } = body;

    // Basic Validation
    if (
      !name ||
      !location ||
      !contactEmail ||
      !contactPhone ||
      !dealerType ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate Dealer Type
    const validDealerTypes = [
      "TractorParts",
      "EquipmentSupplier",
      "Comprehensive",
    ];
    if (!validDealerTypes.includes(dealerType)) {
      return NextResponse.json(
        { error: "Invalid dealer type" },
        { status: 400 }
      );
    }

    // Check if user already has a dealer
    const existingDealer = await prisma.dealer.findUnique({
      where: { userId },
    });

    if (existingDealer) {
      return NextResponse.json(
        { error: "User already registered as a dealer" },
        { status: 400 }
      );
    }

    // Ensure specialties is an array
    const specialtiesArray = Array.isArray(specialties)
      ? specialties
      : [specialties];

    
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "At least one product is required" },
        { status: 400 }
      );
    }

    for (const product of products) {
      if (!product.name || !product.category || !product.price) {
        return NextResponse.json(
          { error: "Each product must have a name, category, and price" },
          { status: 400 }
        );
      }
    }

    // Create Dealer with Products
    const dealer = await prisma.dealer.create({
      data: {
        name,
        location,
        contactEmail,
        contactPhone,
        dealerType,
        specialties: specialtiesArray,
        rating: 0.0, 
        verified: false, 
        user: { connect: { id: userId } }, 
        products: {
          create: products.map((product: Product) => ({
            name: product.name,
            category: product.category,
            price: product.price,
            inStock: product.inStock,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(dealer, { status: 201 });
  } catch (error) {
    console.error("Error adding dealer:", error);
    return NextResponse.json(
      {
        error: "Unable to add dealer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

