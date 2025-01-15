import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { tractorId: string } }
): Promise<NextResponse> {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const tractorId = params.tractorId; // Fix: Access the tractorId properly

    if (!tractorId) {
      return new NextResponse("Tractor ID is required", { status: 400 });
    }

    const tractor = await db.tractor.findUnique({
      where: {
        id: tractorId,
        isApproved: true,
      },
    });

    if (!tractor) {
      return new NextResponse("Tractor not found", { status: 404 });
    }

    if (!tractor.price) {
      return new NextResponse("Tractor price is not set", { status: 400 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_tractorId: {
          userId: user.id,
          tractorId: tractorId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    
    const currency = "KES"; 

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency,
          product_data: {
            name: tractor.title,
            description: tractor.description || "", 
          },
          unit_amount: Math.round(tractor.price * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tractor/${tractor.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tractor/${tractor.id}?canceled=1`,
      metadata: {
        tractorId: tractor.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
