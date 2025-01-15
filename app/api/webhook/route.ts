import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/app/lib/stripe";
import { db } from "@/app/lib/db";

export async function POST(
    req:Request,
) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;


    let event: Stripe.Event;

    try {

        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, {status:400})   
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;

    const tractorId = session?.metadata?.tractorId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !tractorId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        await db.purchase.create({
            data: {
                tractorId: tractorId,
                userId: userId,
            }
        });
    } else {
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, {
          status: 200,
        });
    }

    return new NextResponse(null, { status: 200 });
}