import { TResumeItem } from "@/components/CareerInfoProvider";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

interface IUserIdCareerItem {
  user_id: string;
  resume_data: TResumeItem[];
}

export async function POST(request: NextRequest) {
  const { userId, resumeInfo }: { userId: string; resumeInfo: TResumeItem } =
    await request.json();

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({
      data: "not found supabaseUrl or supabaseKey",
      status: 400,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    // get careerData from dataBase, and then add the ${careerDataAdded} in the careerData
    let { data }: { data: IUserIdCareerItem[] | any } = await supabase
      .from("userId_resumeData")
      .select("*")
      .eq("user_id", userId);

    const rowResumeData: TResumeItem[] = data?.[0]?.resume_data ?? [];
    const newResumeData = [resumeInfo, ...rowResumeData];

    // insert or update careerData into dataBase
    if (data.length === 0) {
      const { error } = await supabase.from("userId_resumeData").insert({
        user_id: userId,
        resume_data: newResumeData,
      });
      if (error) {
        return Response.json({
          type: "supabase insert error",
          data: error,
          status: 500,
        });
      }
    } else {
      const { error } = await supabase
        .from("userId_resumeData")
        .update({ resume_data: newResumeData })
        .eq("user_id", userId);
      if (error) {
        return Response.json({
          type: "supabase update error",
          data: error,
          status: 500,
        });
      }
    }

    return Response.json({ data: "add data successfully", status: 200 });
  } catch (error) {
    console.log("🚀 ~ supabase ~ error:", error);
    return Response.json({ data: `supabase error: ${error}`, status: 500 });
  }
}
