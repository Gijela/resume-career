import { TResumeItem } from "@/components/CareerInfoProvider";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({
      data: "not found supabaseUrl or supabaseKey",
      status: 400,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    let { data } = await supabase
      .from("userId_resumeData")
      .select("*")
      .eq("user_id", userId);
    console.log("🚀 ~ POST ~ data:", data);

    return Response.json({
      data: (data?.[0]?.resume_data || []) as TResumeItem[],
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ supabase ~ error:", error);
    return Response.json({ data: [] as TResumeItem[], status: 500 });
  }
}
