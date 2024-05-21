import Stripe from "stripe";

export async function POST(req: Request) {
  const { userId, creditAmount, priceId, origin, lang } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    // create a pay link
    const { url } = await stripe.checkout.sessions.create({
      success_url: origin + "/" + lang + process.env.STRIPE_PAY_SUCCESS_URL,
      cancel_url: origin + "/" + lang + "/price",
      mode: "payment",
      payment_method_types: lang === "zh" ? ["alipay"] : ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: { userId, creditAmount },
    });
    console.log("🚀 ~ createSession ~ userId:", userId, url);

    // return pay link to frontend
    return Response.json({ status: 200, url });
  } catch (error) {
    console.log("🚀 ~ createSession ~ error:", error);
    return Response.json({ status: 500, message: error });
  }
}
