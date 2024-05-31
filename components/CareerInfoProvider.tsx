"use client";
import { IFile } from "@/app/[lang]/dashboard/Board";
import {
  appendCareerDataByResumeId,
  appendResumeList,
  getResumeList,
} from "@/lib/service/supabase";
import { getLang } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface finalCareerInfo {
  jobTitle: string;
  jobDescription: string;
  timeline: string;
  salary: string;
  difficulty: string;
  workRequired: string;
  aboutTheRole: string;
  whyItsagoodfit: string[];
  roadmap: { [key: string]: string }[];
}

export type TResumeItem = {
  resume_id: string;
  resume_createAt: number;
  resume_Name: string;
  resume_url: string;
};

interface ContextProps {
  generateCareerInfo: (
    file: IFile,
    additionalContext: string
  ) => Promise<Partial<finalCareerInfo>[]>;
  loading: boolean;
  resumeList: TResumeItem[];
}
const CareerInfoContext = createContext<ContextProps>({} as ContextProps);

export default function CareerInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [resumeList, setResumeList] = useState<TResumeItem[]>([]);

  // generate career info from url(one resume)
  const generateCareerInfo = async (file: IFile, additionalContext: string) => {
    setLoading(true);
    try {
      let parsePdfResponse = await fetch("/api/career/parsePdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeUrl: file.url }),
      });
      let parsePdfData = await parsePdfResponse.json();

      let getCareersResponse = await fetch("/api/career/getCareers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeInfo: parsePdfData,
          context: additionalContext,
          lang: getLang(),
        }),
      });

      if (!getCareersResponse.ok) {
        setLoading(false);
        return [];
      }
      let careersData: finalCareerInfo[] = await getCareersResponse.json();
      setLoading(false);

      const newResumeInfo: TResumeItem = {
        resume_id: file.uploadId,
        resume_createAt: file.createAt,
        resume_Name: file.fileName,
        resume_url: file.url,
      };
      setResumeList([newResumeInfo, ...resumeList]);
      console.log("🚀 ~ generateCareerInfo ~ newResumeInfo:", newResumeInfo);

      // put data into supabase table userId_resumeData
      await appendResumeList(user!.id, newResumeInfo);

      // put data into supabase table resumeId_careersData
      await appendCareerDataByResumeId(file.uploadId, careersData);

      return careersData;
    } catch (errorInfo) {
      setLoading(false);
      console.log("errorInfo: ", errorInfo);
      return [];
    }
  };

  const initResumeList = async (userId: string) => {
    const resumeListData = await getResumeList(userId);
    setResumeList(resumeListData);
  };

  useEffect(() => {
    if (user && !resumeList.length) {
      initResumeList(user.id);
    }
  }, [user]);

  return (
    <CareerInfoContext.Provider
      value={{ generateCareerInfo, loading, resumeList }}
    >
      {children}
    </CareerInfoContext.Provider>
  );
}

export const useCareerInfo = () => {
  return useContext(CareerInfoContext) as ContextProps;
};
