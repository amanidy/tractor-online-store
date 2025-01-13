import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    req: Request,
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {params}:any
): Promise<NextResponse> {

    try {

        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tractorId = params;


        const tractor = await db.tractor.findUnique({
            where: {
                id: tractorId,
                isApproved: true,
            }
        });

        if (!tractor) {
            return new NextResponse("Not found", { status: 404 });
        }
       

        const purchase = await db.purchase.findUnique({
            where: {
                userId_tractorId: {
                    userId: user.id,
                    tractorId: tractorId,
                }
            }
        });

        if (purchase) {
            return new NextResponse("Already Purchased", { status: 400 });
        }


        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD | KSH",
                    product_data: {
                        name: tractor.title,
                        description: tractor.description!,
                    },
                    unit_amount: Math.round(tractor.price! * 100),
                }
            }
        ];


        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            }
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                }
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
                userId : user.id,
          }
        });


        return NextResponse.json({url:session.url});
        

    } catch (error) {
        console.log("[CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
    
}