import { TypeLocale } from "@/lib/i18n";
import {
  getCareerDetailMessage,
  getSixCareerMessage,
} from "@/lib/questionTemplate";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const together = new OpenAI({
  baseURL: "https://together.hconeai.com/v1",
  apiKey: process.env.TOGETHER_API_KEY,
  // defaultHeaders: {
  //   "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  // },
});

export interface GetCareersRequest {
  resumeInfo: string;
  context: string;
  lang: TypeLocale;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context, lang } =
    (await request.json()) as GetCareersRequest;

  const chatCompletion = await together.chat.completions.create({
    messages: getSixCareerMessage({ resumeInfo, context, lang }),
    model: "meta-llama/Llama-3-70b-chat-hf",
  });
  const careers = chatCompletion.choices[0].message.content;

  const careerInfoJSON = JSON.parse(careers!);

  let finalResults = await Promise.all(
    careerInfoJSON.map(async (career: any) => {
      try {
        const completion = await together.chat.completions.create({
          messages: getCareerDetailMessage({
            resumeInfo,
            context,
            lang,
            career,
          }),
          model: "meta-llama/Llama-3-70b-chat-hf",
        });
        const specificCareer = completion.choices[0].message.content;
        const specificCareerJSON = JSON.parse(specificCareer!);

        const individualCareerInfo = { ...career, ...specificCareerJSON };
        return individualCareerInfo;
      } catch (error) {
        console.log("Career that errored: ", career.jobTitle);
        console.log({ error });
        return new Response(JSON.stringify({ error }), {
          status: 500,
        });
      }
    })
  );

  return new Response(JSON.stringify(finalResults), {
    status: 200,
  });
}
