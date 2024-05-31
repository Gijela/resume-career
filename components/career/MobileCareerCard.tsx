import { finalCareerInfo } from "@/components/CareerInfoProvider";
import {
  careerNodeLocale,
  systemContent,
  welcomeContent,
} from "@/components/career/CareerNode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypeLocale } from "@/lib/i18n";

import {
  ChatCompletionRequestMessage,
  useMessages,
} from "@/components/chat/MessagesProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export function MobileCareerCard({
  lang,
  job,
}: {
  lang: Partial<TypeLocale>;
  job: Partial<finalCareerInfo>;
}) {
  const { setMessages, setLearnTarget } = useMessages();
  const router = useRouter();

  const handleClickRoadStep = (learnTarget: string) => {
    const systemMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: systemContent[lang as "en" | "zh"],
    };
    const welcomeMessage: ChatCompletionRequestMessage = {
      role: "assistant",
      content: welcomeContent[lang as "en" | "zh"],
    };
    setMessages([systemMessage, welcomeMessage]);
    const questionContent = {
      zh: `我的职业是${job?.jobTitle}，我的学习目标是${learnTarget}请您向我推荐5个视频、5本书籍、5个高质量相关网页的学习资源，要求您必须将每个学习资源的出处url返回，并且告诉我为什么选用这个学习资源，它能在哪方面给我带来提升。`,
      en: `My job is ${job?.jobTitle}, and my learning target is ${learnTarget} Please recommend me 5 videos, 5 books, 5 high-quality related web pages of learning resources, you must return the source URL of each learning resources, and tell me why I choose this learning resource and what it can do to improve me.`,
    };
    setLearnTarget(questionContent[lang as "en" | "zh"]);
    router.push(`/${lang}/chat`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="border-blue-600 rounded-2xl cursor-pointer">
          <CardHeader>
            <CardTitle>{job?.jobTitle}</CardTitle>
            <CardDescription>{job?.jobDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="font-light">
                  {careerNodeLocale[lang]?.timeline}:
                </div>
                <div className="font-medium text-lg">{job?.timeline}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-light">
                  {careerNodeLocale[lang]?.salary}:
                </div>
                <div className="font-medium text-lg text-blue-500">
                  {job?.salary}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-light">
                  {careerNodeLocale[lang]?.salarySource}:
                </div>
                <div className="font-medium text-lg">boss</div>
              </div>
              <div className="flex justify-between">
                <div className="font-light">
                  {careerNodeLocale[lang]?.difficulty}:
                </div>
                <div
                  className={`font-semibold ${
                    job?.difficulty?.toLowerCase() == "low"
                      ? "text-green-600"
                      : job?.difficulty?.toLowerCase() == "high"
                      ? "text-red-600"
                      : "text-orange-600"
                  } text-lg`}
                >
                  {job?.difficulty}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[90vw] max-h-[90vh] rounded-3xl overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
              <span className="text-2xl">
                {job?.jobTitle ?? "SEO Specialist"}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm">
                  {job?.timeline}
                </span>
                <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm text-blue-500 cursor-pointer">
                  <a href={job?.salarySource || job?.salaryUrl} target="_blank">
                    {job?.salary}
                  </a>
                </span>
                <span
                  className={`border rounded-3xl border-gray-200 px-3 py-1 text-sm font-semibold ${
                    job?.difficulty?.toLowerCase() == "low"
                      ? "text-green-600"
                      : job?.difficulty?.toLowerCase() == "high"
                      ? "text-red-600"
                      : "text-orange-600"
                  } text-lg`}
                >
                  {job?.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 sm:mt-0">
              <div className="font-bold">
                {careerNodeLocale[lang]?.work_required}:
              </div>
              <span className="border rounded-3xl border-gray-200 px-3 py-1 text-sm">
                {job?.workRequired ?? "10-20 hours/week"}
              </span>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col sm:flex-row gap-7 border-t border-black pt-6">
          {/* desc */}
          <div className="flex flex-col gap-4 sm:w-2/5">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {careerNodeLocale[lang]?.question_head_first}
                {job?.jobTitle}?
              </h2>
              <p>
                {job?.aboutTheRole ??
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
                {careerNodeLocale[lang]?.question_head_second}?
              </h2>
              <ul className="list-disc ml-4">
                {job?.whyItsagoodfit?.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* roadmap */}
          <div className="sm:w-3/5">
            <h2 className="text-lg font-semibold mb-2">
              {careerNodeLocale[lang]?.roadmap}
            </h2>
            <div className="flex flex-col gap-4 sm:gap-2">
              {job?.roadmap?.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row cursor-pointer gap-1 sm:gap-3"
                >
                  <div
                    className={`font-bold sm:font-light ${
                      lang === "zh" ? "min-w-20" : "min-w-28"
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

        <AlertDialogCancel>{careerNodeLocale[lang]?.close}</AlertDialogCancel>
        {job?.roadmap?.length && (
          <AlertDialogAction
            onClick={() =>
              handleClickRoadStep(Object.values(job?.roadmap![0])[0])
            }
          >
            {careerNodeLocale[lang]?.chat}
          </AlertDialogAction>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
