import { PrismaClient } from "@prisma/client";
import { NextApiRequest,NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
     const {
       title,
       description,
       price,
       location,
       specifications,
       history,
       images,
       sellerId,
     } = req.body;
    
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !specifications ||
      !sellerId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

     try {
       const newTractor = await prisma.tractor.create({
         data: {
           title,
           description,
           price: parseFloat(price),
           location,
           specifications,
           history,
           images,
           sellerId,
         },
       });

       res.status(201).json({
         message: "Tractor listing created successfully",
         tractor: newTractor,
       });
     } catch (error) {
       console.error("Tractor creation error:", error);
       res
         .status(500)
         .json({ error: "An error occurred while creating the listing" });
     }
    
}