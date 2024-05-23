import { TCareerDataItem } from "@/components/CareerInfoProvider";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

interface IUserIdCareerItem {
  user_id: string;
  career_data: TCareerDataItem[];
}

export async function POST(request: NextRequest) {
  const {
    userId,
    careerDataAdded,
  }: { userId: string; careerDataAdded: TCareerDataItem } =
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
      .from("userId_career")
      .select("*")
      .eq("user_id", userId);

    const rowCareerData: TCareerDataItem[] = data?.[0]?.career_data ?? [];
    const careerDataArray = [careerDataAdded, ...rowCareerData];

    // insert or update careerData into dataBase
    if (data.length === 0) {
      const { error } = await supabase.from("userId_career").insert({
        user_id: userId,
        career_data: careerDataArray,
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
        .from("userId_career")
        .update({ career_data: careerDataArray })
        .eq("user_id", userId);
      if (error) {
        return Response.json({
          type: "supabase update error",
          data: error,
          status: 500,
        });
      }
    }

    return Response.json({ data: "add career data successfully", status: 200 });
  } catch (error) {
    console.log("🚀 ~ supabase ~ error:", error);
    return Response.json({ data: `supabase error: ${error}`, status: 500 });
  }
}
