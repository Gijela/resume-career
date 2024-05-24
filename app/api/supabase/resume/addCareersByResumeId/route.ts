import { finalCareerInfo } from "@/components/CareerInfoProvider";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

export async function POST(request: NextRequest) {
  const {
    resumeId,
    careerData,
  }: { resumeId: string; careerData: finalCareerInfo[] } = await request.json();

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({
      data: "api addCareersByResumeId not found supabaseUrl or supabaseKey",
      status: 400,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    // get careerData from dataBase, and then add the ${careerDataAdded} in the careerData
    const { error } = await supabase.from("resumeId_careersData").insert({
      resume_id: resumeId,
      careers_data: careerData,
    });
    if (error) {
      return Response.json({
        type: "api addCareersByResumeId supabase insert error",
        data: error,
        status: 500,
      });
    }

    return Response.json({
      data: "addCareersByResumeId successfully",
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ supabase ~ error:", error);
    return Response.json({ data: `supabase error: ${error}`, status: 500 });
  }
}
