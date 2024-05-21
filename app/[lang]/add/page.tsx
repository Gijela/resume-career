"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export type TCareerDataItem = {
  resume_id: string;
  resume_data: { [key: string]: any };
};

const careerDataAdded: TCareerDataItem = {
  resume_id: "xxx2",
  resume_data: {
    a: 4,
  },
};

export default function Career() {
  // const [careerInfo, setCareerInfo] = useState<TCareer[]>([]);
  const { user } = useUser();

  async function addCareers(userId: string, careerDataAdded: TCareerDataItem) {
    const response = await fetch("/api/supabase/addCareersByUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, careerDataAdded }),
    });
    const { data, status } = await response.json();
    console.log("🚀 ~ addCareers ~ success, status:", status, data);
  }

  useEffect(() => {
    if (user) {
      console.log("🚀 ~ add ~ user Careers:", user.id);
      addCareers(user.id, careerDataAdded);
    }
  }, [user]);

  return <>33</>;
}
// user_2gj1cdb5lGWw8BVfZthmJffK9sd
