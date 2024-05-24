import { finalCareerInfo } from "@/components/CareerInfoProvider";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
export async function POST(request: NextRequest) {
  const { resumeId } = await request.json();

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({
      data: "api getCareersByResumeId not found supabaseUrl or supabaseKey",
      status: 400,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    let { data } = await supabase
      .from("resumeId_careersData")
      .select("*")
      .eq("resume_id", resumeId);

    return Response.json({
      data: data?.[0]?.careers_data as finalCareerInfo[],
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ supabase getCareersByResumeId ~ error:", error);
    return Response.json({ data: [] as finalCareerInfo[], status: 500 });
  }
}
