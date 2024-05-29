import {
  ChatCompletionRequestMessage,
  useMessages,
} from "@/components/chat/MessagesProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypeLocale, defaultLocale } from "@/lib/i18n";
import { getLang } from "@/lib/utils";
import { TypeI18nData } from "@/types/siteConfig";
import { useRouter } from "next/navigation";
import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

type CareerNodeProps = {
  jobTitle?: string;
  jobDescription?: string;
  timeline?: string;
  salary?: string;
  difficulty?: string;
  connectPosition?: string;
  label?: string;
  workRequired?: string;
  aboutTheRole?: string;
  whyItsagoodfit?: string[];
  roadmap?: { [key: string]: string }[];
};

export const careerNodeLocale: Partial<Record<TypeLocale, TypeI18nData>> = {
  en: {
    timeline: "TIMELINE",
    salary: "SALARY",
    difficulty: "DIFFICULTY",
    work_required: "Work Required",
    question_head_first: "What's a ",
    question_head_second: "Why it's a good fit",
    roadmap: "Roadmap",
  },
  zh: {
    timeline: "时间线",
    salary: "薪资",
    difficulty: "难度",
    work_required: "需要工作",
    question_head_first: "什么是",
    question_head_second: "为什么合适",
    roadmap: "学习路线",
  },
};

export const systemContent = {
  zh: "您是一位杰出的职业指导者，擅长使用有趣和互动的方式去指导别人学习新技能，并且每次指导都会给出相关学习资源和资源链接。",
  en: `You are an outstanding career coach who is good at using fun and interactive ways to mentor others in learning new skills, and each tutorial provides relevant learning resources and links to them.`,
};
export const welcomeContent = {
  zh: "您好，我是您的专属职业技能学习助手, 有什么可以帮助您？",
  en: "Hello, I am your professional skills learning assistant, how can I help you?",
};

function CareerNode({ data }: NodeProps<CareerNodeProps>) {
  const {
    jobTitle,
    jobDescription,
    timeline,
    salary,
    difficulty,
    connectPosition,
    workRequired,
    aboutTheRole,
    whyItsagoodfit,
    roadmap,
  } = data;
  const position = connectPosition === "top" ? Position.Top : Position.Bottom;

  const { setMessages, setLearnTarget } = useMessages();
  const router = useRouter();

  const handleClickRoadStep = (learnTarget: string) => {
    const lang = (getLang() || defaultLocale) as "en" | "zh";
    const systemMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: systemContent[lang],
    };
    const welcomeMessage: ChatCompletionRequestMessage = {
      role: "assistant",
      content: welcomeContent[lang],
    };
    setMessages([systemMessage, welcomeMessage]);
    const questionContent = {
      zh: `我的职业是${jobTitle}，我的学习目标是${learnTarget}请您向我推荐5个视频、5本书籍、5个高质量相关网页，要求将推荐资源的链接返回。`,
      en: `My job is ${jobTitle}, and my learning target is ${learnTarget} Please recommend 5 videos、5 books、5 high-quality related web pages to me and ask to return links to recommended resources.`,
    };
    setLearnTarget(questionContent[lang]);
    router.push(`/${lang}/chat`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-[2px] border-blue-700 rounded-2xl py-4 px-7 max-w-[350px] bg-gray-50 dark:bg-gray-800">
          <Handle type="target" position={position} />
          <h1 className="text-2xl font-bold mb-2">{jobTitle}</h1>
          <p className="mb-4 font-light">{jobDescription}</p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="font-light">
                {careerNodeLocale[getLang() || defaultLocale]?.timeline}:
              </div>
              <div className="font-medium text-lg">{timeline}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-light">
                {careerNodeLocale[getLang() || defaultLocale]?.salary}:
              </div>
              <div className="font-medium text-lg">{salary}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-light">
                {careerNodeLocale[getLang() || defaultLocale]?.difficulty}:
              </div>
              <div
                className={`font-semibold ${
                  difficulty?.toLowerCase() == "low"
                    ? "text-green-600"
                    : difficulty?.toLowerCase() == "high"
                    ? "text-red-600"
                    : "text-orange-600"
                } text-lg`}
              >
                {difficulty}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[80vw] max-h-[90vh] sm:max-h-[80vh] rounded-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
              <span className="text-2xl">{jobTitle ?? "SEO Specialist"}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm">
                  {timeline}
                </span>
                <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm">
                  {salary}
                </span>
                <span
                  className={`border rounded-3xl border-gray-200 px-3 py-1 text-sm font-semibold ${
                    difficulty?.toLowerCase() == "low"
                      ? "text-green-600"
                      : difficulty?.toLowerCase() == "high"
                      ? "text-red-600"
                      : "text-orange-600"
                  } text-lg`}
                >
                  {difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mr-5 mt-3 sm:mt-0">
              <div className="font-bold">
                {careerNodeLocale[getLang() || defaultLocale]?.work_required}:
              </div>
              <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm">
                {workRequired ?? "10-20 hours/week"}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-7 border-t border-black pt-6">
          {/* desc */}
          <div className="flex flex-col gap-4 sm:w-2/5">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {
                  careerNodeLocale[getLang() || defaultLocale]
                    ?.question_head_first
                }
                {jobTitle}?
              </h2>
              <p>
                {aboutTheRole ??
                  `SEO Specialists optimize websites to rank higher in search
                engine results, aiming to increase online visibility, drive
                organic traffic, and improve user engagement. They conduct
                keyword research, analyze competitors, and implement SEO
                strategies that include on-page optimization, link building, and
                content creation.`}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 mt-6">
                {
                  careerNodeLocale[getLang() || defaultLocale]
                    ?.question_head_second
                }
                ?
              </h2>
              <ul className="list-disc ml-4">
                {whyItsagoodfit?.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* roadmap */}
          <div className="sm:w-3/5">
            <h2 className="text-lg font-semibold mb-2">
              {careerNodeLocale[getLang() || defaultLocale]?.roadmap}
            </h2>
            <div className="flex flex-col gap-4 sm:gap-2">
              {roadmap?.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row cursor-pointer gap-1 sm:gap-3"
                >
                  <div
                    className={`font-bold sm:font-light ${
                      getLang() === "zh" ? "min-w-20" : "min-w-28"
                    }`}
                  >
                    {Object.keys(step)[0]}:
                  </div>
                  <div
                    className={`${
                      index === 0 ? "text-blue-400" : ""
                    } hover:text-blue-600`}
                    onClick={() => handleClickRoadStep(Object.values(step)[0])}
                  >
                    {Object.values(step)[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <DialogFooter>
          <Button className="mt-4" type="submit">
            Save changes
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default memo(CareerNode);
