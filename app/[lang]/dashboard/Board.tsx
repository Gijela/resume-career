"use client";

import { TResumeItem, useCareerInfo } from "@/components/CareerInfoProvider";
import DocIcon from "@/components/ui/DocIcon";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/ui/loadingdots";
import { Textarea } from "@/components/ui/textarea";
import { TypeLocale } from "@/lib/i18n";
import { getUploaderOptions } from "@/lib/utils";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export interface IFile {
  url: string;
  uploadId: string;
  createAt: number;
  fileName: string;
}

export default function DashBoard({
  lang,
  dashBoard,
}: {
  lang: TypeLocale;
  dashBoard: { [key: string]: string };
}) {
  const [file, setFile] = useState<IFile>({} as IFile);
  const { generateCareerInfo, loading, resumeList } = useCareerInfo();
  const [additionalContext, setAdditionalContext] = useState<string>("");
  const router = useRouter();
  const { user } = useUser();

  const findIdealCareer = async () => {
    if (!user || !user.id) {
      toast.error(dashBoard.signTip);
      return;
    }
    const careersData = await generateCareerInfo(file, additionalContext);

    if (Array.isArray(careersData) && careersData.length > 0) {
      router.push(`/${lang}/career/${file.uploadId}`);
    } else {
      toast.error("findIdealCareer error, please try again.");
    }
  };

  return (
    <div>
      <div className="sm:px-10 pt-4 sm:pt-8 flex justify-center items-center flex-col ">
        <h1 className="text-center text-5xl mb-5 font-bold">
          {dashBoard.title}
        </h1>
        <p className="px-4 sm:px-0 mb-4 sm:mb-12 text-center text-gray-600 sm:max-w-3xl">
          {dashBoard.desc}
        </p>
        <div className="flex flex-col sm:flex-row sm:min-w-[80rem] mx-auto sm:px-6 lg:px-8">
          <UploadDropzone
            options={getUploaderOptions(dashBoard.uploadBtnMsg)}
            onUpdate={({ uploadedFiles }) => {
              if (uploadedFiles.length !== 0) {
                const {
                  fileUrl,
                  metadata,
                  lastModified: createAt,
                  originalFileName: fileName,
                } = uploadedFiles[0].originalFile;

                setFile({
                  url: fileUrl,
                  uploadId: metadata.uploadId,
                  createAt: createAt,
                  fileName: fileName as string,
                });
              }
            }}
            onComplete={() => console.log("upload complete")}
            // width="50%"
            height={"250px"}
          />
          <Textarea
            className="w-[300px] sm:w-2/4 mx-[15px] sm:mx-[0px] sm:my-[15px] sm:ml-4 text-base border border-gray-400 focus:border-black"
            placeholder={dashBoard.add_placeHolder}
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            rows={6}
          />
        </div>
        <div className="mt-4 sm:mt-10 flex flex-col items-center">
          <Button
            onClick={findIdealCareer}
            className="text-base px-5 py-7 min-w-80"
            disabled={file.url ? false : true}
          >
            {loading ? (
              <>
                {dashBoard.loadingDotMsg}
                <LoadingDots style="big" color="white" />
              </>
            ) : (
              <>{dashBoard.generateBtnMsg}</>
            )}
          </Button>
          <p className="mt-2 text-gray-500">{dashBoard.cost_msg}</p>
        </div>

        {/* list */}
        {resumeList && resumeList.length > 0 && (
          <>
            <h1 className="pt-8 text-center text-5xl mb-5 font-bold">
              {dashBoard.selectList_title}
            </h1>

            <div className="flex flex-col mx-10 my-5 overflow-auto max-h-[80vh] shadow-sm border divide-y-2 min-w-[300px] sm:min-w-[800px]">
              {resumeList.map((resume: TResumeItem) => (
                <div
                  key={resume.resume_id}
                  className="flex justify-between cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900 p-3 transition sm:flex-row flex-col sm:gap-0 gap-3"
                  onClick={() =>
                    router.push(`/${lang}/career/${resume.resume_id}`)
                  }
                >
                  <span className="flex gap-4">
                    <DocIcon />
                    <span>{resume.resume_Name}</span>
                  </span>
                  <span className="text-end sm:text-start">
                    {formatDistanceToNow(resume.resume_createAt)} ago
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}
