"use client";
import { IFile } from "@/app/[lang]/dashboard/Board";
import { getLang } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ReactNode, createContext, useContext, useState } from "react";

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

export type TCareerDataItem = {
  resume_id: string;
  resume_createAt: number;
  resume_Name: string;
  resume_data: finalCareerInfo[];
};

interface ContextProps {
  curCareerInfo: Partial<finalCareerInfo>[];
  setCurCareerInfo: (info: Partial<finalCareerInfo>[]) => void;
  generateCareerInfo: (
    file: IFile,
    additionalContext: string
  ) => Promise<Partial<finalCareerInfo>[]>;
  loading: boolean;
  error: string;
  appendCareerIntoSupabase: (careerDataAdded: TCareerDataItem) => void;
  getCareersByUserId: (userId: string) => Promise<TCareerDataItem[] | string>;
}

const CareerInfoContext = createContext<ContextProps>({} as ContextProps);

export default function CareerInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const [curCareerInfo, setCurCareerInfo] = useState<
    Partial<finalCareerInfo>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const appendCareerIntoSupabase = async (careerDataAdded: TCareerDataItem) => {
    try {
      await fetch("/api/supabase/addCareersByUserId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          careerDataAdded,
        }),
      });
    } catch (error) {
      console.log("/api/supabase/addCareersByUserId Error:", error);
    }
  };

  // all career data from supabase by userId
  const getCareersByUserId = async (userId: string) => {
    const response = await fetch("/api/supabase/getCareersByUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const { data }: { data: TCareerDataItem[] | string } =
      await response.json();

    return data;
  };

  // generate career info from url(one resume)
  const generateCareerInfo = async (file: IFile, additionalContext: string) => {
    setLoading(true);
    try {
      let response = await fetch("/api/career/parsePdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeUrl: file.url }),
      });
      let data = await response.json();

      let response2 = await fetch("/api/career/getCareers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeInfo: data,
          context: additionalContext,
          lang: getLang(),
        }),
      });

      if (!response2.ok) {
        setLoading(false);
        setError("Failed to fetch career.");
        return [];
      }
      let data2: finalCareerInfo[] = await response2.json();
      setCurCareerInfo(data2);
      setLoading(false);

      // put data2 into supabase
      await appendCareerIntoSupabase({
        resume_id: file.uploadId,
        resume_createAt: file.createAt,
        resume_Name: file.fileName,
        resume_data: data2,
      } as TCareerDataItem);

      return data2;
    } catch (errorInfo) {
      setLoading(false);
      console.log("errorInfo: ", errorInfo);
      setError("generateCareerInfo failed.");
      return [];
    }
  };

  return (
    <CareerInfoContext.Provider
      value={{
        curCareerInfo,
        setCurCareerInfo,
        generateCareerInfo,
        loading,
        error,
        appendCareerIntoSupabase,
        getCareersByUserId,
      }}
    >
      {children}
    </CareerInfoContext.Provider>
  );
}

export const useCareerInfo = () => {
  return useContext(CareerInfoContext) as ContextProps;
};
