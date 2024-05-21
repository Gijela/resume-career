import { validateWebHook, webhookEventsMap } from "@/lib/validateWebHook";
import { clerkClient } from "@clerk/nextjs/server";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

export async function POST(request: Request) {
  // enable request origin safe, because request origin can be faked
  const webhookResult = await validateWebHook(request, webhookSecret);
  const { id: userId } = webhookResult.data;

  if (webhookResult.type !== webhookEventsMap.createUser || !userId) {
    return new Response(null, { status: 200 });
  }

  try {
    // every new user, give he/she 3 credits
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { credit: Number(process.env.CLERK_INIT_CREDIT_AMOUNT) },
    });
  } catch (error) {
    console.log("🚀 ~ init user 3 Credits error:", error);
    return Response.json({ message: error });
  }

  return Response.json({ message: "Received" });
}
