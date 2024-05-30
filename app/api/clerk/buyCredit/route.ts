import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// test button
export async function POST(request: Request) {
  const { userId, creditBuy } = await request.json();

  try {
    const { publicMetadata } = await clerkClient.users.getUser(userId);

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        credit: Number(publicMetadata.credit) + Number(creditBuy),
      },
    });

    return NextResponse.json({
      text: "Successfully buy credit",
      status: 200,
    });
  } catch (error) {
    console.log("buyCredit error", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
