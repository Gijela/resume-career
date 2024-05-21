"use client";
import { TypeLocale } from "@/lib/i18n";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const creditCost = 2; // 消费积分
const creditBuy = 2; // 购买积分

export default function DashBoard({
  params: { lang },
}: {
  params: { lang: TypeLocale };
}) {
  const { user } = useUser();
  const [credit, setCredit] = useState<number>(
    (user?.publicMetadata?.credit as number) || 0
  );

  const handleCostCredit = async () => {
    const res = await fetch("/api/clerk/costCredit", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        creditCost: creditCost,
      }),
    });

    const data = await res.json();
    if (data.status === 200) {
      setCredit(credit - creditCost);
    }
  };

  const handleBuyCredit = async () => {
    const res = await fetch("/api/clerk/buyCredit", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        creditBuy: creditBuy,
      }),
    });

    const data = await res.json();
    if (data.status === 200) {
      setCredit(credit + creditCost);
    }
  };

  useEffect(() => {
    setCredit(user?.publicMetadata.credit as number);
  }, [user?.publicMetadata.credit]);

  return (
    <div>
      <h1>dashboard</h1>
      <p>lang type: {lang}</p>
      <p>publicMetadata-credit: {credit}</p>
      <p>user-id: {JSON.stringify(user?.id)}</p>
      <button onClick={handleCostCredit} style={{ background: "pink" }}>
        消耗积分
      </button>
      <button
        onClick={handleBuyCredit}
        style={{ background: "yellow", marginLeft: 50 }}
      >
        增加积分
      </button>
    </div>
  );
}
