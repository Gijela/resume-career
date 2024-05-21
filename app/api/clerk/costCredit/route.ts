import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, creditCost } = await request.json();

  try {
    const { publicMetadata } = await clerkClient.users.getUser(userId);

    if (Number(publicMetadata.credit) >= Number(creditCost)) {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          credit: Number(publicMetadata.credit) - Number(creditCost),
        },
      });
      return NextResponse.json({
        text: "Successfully cost credit",
        status: 200,
      });
    }
  } catch (error) {
    console.log("costCredit error", error);
    return NextResponse.json({ error: error, status: 500 });
  }
  return NextResponse.json({ text: "Insufficient_credit", status: 400 });
}
