"use client";

import { TCareerDataItem } from "@/app/[lang]/add/page";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Career() {
  const [careerInfo, setCareerInfo] = useState<TCareerDataItem[]>([]);
  const { user } = useUser();

  async function getCareers(userId: string) {
    const response = await fetch("/api/supabase/getCareersByUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const {
      data,
      status,
    }: { data: TCareerDataItem[] | string; status: number } =
      await response.json();

    if (status === 200 && Array.isArray(data) && data.length > 0) {
      console.log("获取到的具体每个简历", data);
      setCareerInfo(data);
    }
  }

  useEffect(() => {
    if (user) {
      console.log("🚀 ~ useEffect ~ user:", user);
      getCareers(user.id);
    }
  }, [user]);

  return <>{JSON.stringify(careerInfo)}</>;
}
// user_2gj1cdb5lGWw8BVfZthmJffK9sd
