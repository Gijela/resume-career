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

const KIMI_BASE_URL = process.env.KIMI_BASE_URL;
const KIMI_APIKEY = process.env.KIMI_APIKEY;

interface ICareerNode {
  jobTitle: string;
  jobDescription: string;
  timeline: string;
  salary: string;
  difficulty: string;
  salarySource?: string;
}

export interface GetCareersRequest {
  resumeInfo: string;
  context: string;
  lang: TypeLocale;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context, lang } =
    (await request.json()) as GetCareersRequest;

  // get six recommend careers
  let sixCareerInfo: ICareerNode[];
  if (lang === "zh") {
    const response = await fetch(`${KIMI_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${KIMI_APIKEY}`,
      },
      body: JSON.stringify({
        messages: getSixCareerMessage({ resumeInfo, context, lang }),
        model: "moonshot-v1-128k",
      }),
    });
    const result = await response.json();
    sixCareerInfo = JSON.parse(result.choices[0].message.content).jobs;
  } else {
    const chatCompletion = await together.chat.completions.create({
      messages: getSixCareerMessage({ resumeInfo, context, lang }),
      model: "meta-llama/Llama-3-70b-chat-hf",
    });
    const careers = chatCompletion.choices[0].message.content;
    sixCareerInfo = JSON.parse(careers!);
  }

  // use promise.all concurrent request career detail.
  let finalResults = await Promise.all(
    sixCareerInfo.map(async (career: ICareerNode) => {
      try {
        if (lang === "zh") {
          const response = await fetch(`${KIMI_BASE_URL}/v1/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${KIMI_APIKEY}`,
            },
            body: JSON.stringify({
              messages: getCareerDetailMessage({
                resumeInfo,
                context,
                lang,
                career,
              }),
              model: "moonshot-v1-128k",
            }),
          });
          const careerDetailInfo = await response.json();
          const specificCareer = JSON.parse(
            careerDetailInfo.choices[0].message.content
          );
          return { ...career, ...specificCareer };
        } else {
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
        }
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
