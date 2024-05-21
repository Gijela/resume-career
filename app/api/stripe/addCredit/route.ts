import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

type webhookObj = {
  metadata: {
    userId: string;
    creditAmount: string;
  };
};

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  try {
    // verify stripe signature, enable origin safely
    const reqRowBody = await req.text();
    const signature = req.headers.get("stripe-signature") as string;
    const { data: webhookInfo } = stripe.webhooks.constructEvent(
      reqRowBody,
      signature,
      webhookSecret
    );

    // add credit to user
    const { metadata } = webhookInfo.object as unknown as webhookObj;
    const { userId, creditAmount } = metadata;
    const { publicMetadata } = await clerkClient.users.getUser(userId);
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        credit: Number(publicMetadata.credit) + Number(creditAmount),
      },
    });

    return Response.json({
      status: 200,
      message: "add credit successfully",
      userId,
      creditAmount,
    });
  } catch (error) {
    return Response.json({ status: 500, message: error });
  }
}
