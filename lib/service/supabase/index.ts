import { TResumeItem, finalCareerInfo } from "@/components/CareerInfoProvider";

// add Resume into supabase Table userId_resumeData by userId
export const appendResumeList = async (
  userId: string,
  resumeInfo: TResumeItem
) => {
  try {
    await fetch("/api/supabase/resumeList/addResumeByUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, resumeInfo }),
    });
  } catch (error) {
    console.log("/api/supabase/addCareersByUserId Error:", error);
  }
};

// get ResumeList from supabase Table userId_resumeData by userId
export const getResumeList = async (userId: string) => {
  const response = await fetch(
    "/api/supabase/resumeList/getResumeListByUserId",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );
  const { data }: { data: TResumeItem[] } = await response.json();

  return data;
};

// add CareerData into supabase Table resumeId_careersData by resumeId
export const appendCareerDataByResumeId = async (
  resumeId: string,
  careerData: Partial<finalCareerInfo>[]
) => {
  try {
    await fetch("/api/supabase/resume/addCareersByResumeId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeId, careerData }),
    });
  } catch (error) {
    console.log("/api/supabase/resume/addCareersByResumeId Error:", error);
  }
};

// get CareersData from supabase Table resumeId_careersData by resumeId
export const getCareersByResumeId = async (resumeId: string) => {
  const response = await fetch("/api/supabase/resume/getCareersByResumeId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId }),
  });
  const { data }: { data: finalCareerInfo[] } = await response.json();

  return data;
};
