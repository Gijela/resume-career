"use client";

import {
  TCareerDataItem,
  finalCareerInfo,
  useCareerInfo,
} from "@/components/CareerInfoProvider";
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
import { useEffect, useState } from "react";
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
  const {
    curCareerInfo,
    setCurCareerInfo,
    generateCareerInfo,
    loading,
    error,
    getCareersByUserId,
  } = useCareerInfo();
  const [additionalContext, setAdditionalContext] = useState<string>("");
  const [careerList, setCareerList] = useState<TCareerDataItem[]>([]);

  const router = useRouter();
  const { user } = useUser();

  const notify = (error: string) => toast.error(`${error} please try again.`);

  const findIdealCareer = async () => {
    await generateCareerInfo(file, additionalContext);

    if (curCareerInfo.length > 0 && !loading) {
      router.push(`/${lang}/career`);
    } else {
      notify(error);
      user && getCareersList(user.id);
      console.log("🚀 ~ findIdealCareer ~ error:", error);
    }
  };

  const getCareersList = async (userId: string) => {
    const careersData = await getCareersByUserId(userId);
    if (typeof careersData === "string") {
      console.log(careersData);
      return;
    }

    console.log("🚀 ~ getCareersList ~ careersData:", careersData);
    setCareerList(careersData);
  };

  const handleClickResume = (
    resumeId: string,
    resumeData: finalCareerInfo[]
  ) => {
    setCurCareerInfo(resumeData);
    router.push(`/${lang}/career/${resumeId}`);
  };

  useEffect(() => {
    if (user) {
      getCareersList(user.id);
    }
  }, [user]);

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
              <LoadingDots style="big" color="white" />
            ) : (
              <>{dashBoard.generateBtnMsg}</>
            )}
          </Button>
          <p className="mt-2 text-gray-500">{dashBoard.cost_msg}</p>
        </div>

        {/* list */}
        {careerList.length > 0 && (
          <>
            <h1 className="pt-8 text-center text-5xl mb-5 font-bold">
              {dashBoard.selectList_title}
            </h1>

            <div className="flex flex-col gap-4 mx-10 my-5">
              <div className="flex flex-col shadow-sm border divide-y-2 min-w-[300px] sm:min-w-[800px] mx-auto">
                {careerList.map((career: TCareerDataItem) => (
                  <div
                    key={career.resume_id}
                    className="flex justify-between cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900 p-3 transition sm:flex-row flex-col sm:gap-0 gap-3"
                    onClick={() =>
                      handleClickResume(career.resume_id, career.resume_data)
                    }
                  >
                    <span className="flex gap-4">
                      <DocIcon />
                      <span>{career.resume_Name}</span>
                    </span>
                    <span>
                      {formatDistanceToNow(career.resume_createAt)} ago
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}
