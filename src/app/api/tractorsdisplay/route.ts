import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma Client instances in development
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tractors = await prisma.tractor.findMany({
      // Optional: include related data if needed
      include: {
        seller: {
          select: {
            name: true,
            
          },
        },
      },
    });

    return res.status(200).json({ tractors });
  } catch (error) {
    console.error("Fetch tractors error:", error);
    return res.status(500).json({ error: "Failed to fetch listings" });
  }
}
