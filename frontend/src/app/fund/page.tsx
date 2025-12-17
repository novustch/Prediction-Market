"use client";

import FundCard from "@/components/elements/fund/FundCard";
import Market from "@/components/elements/marketInfo/Market";
import { useGlobalContext } from "@/providers/GlobalContext";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FundMarket() {
  const pathname = usePathname();
  const { setActiveTab } = useGlobalContext(); // Ensure setActiveTab exists in context

  useEffect(() => {
    if (pathname === "/fund") {
      setActiveTab("PENDING"); // Update tab
    }
  }, [pathname, setActiveTab]); // Dependency array ensures it runs on pathname change

  return (
    <div className="self-stretch sm:px-[40px] px-5 inline-flex flex-col justify-start items-start gap-[50px] overflow-auto">
      {/* <MarketCarousel /> */}
      <FundCard
        title="Will Bitcoin hit 100K by April?"
        description="This market will resolve to “Yes” if Bitcoin hits 100K by April. If not, it will resolve to “No”."
        category="Cryptocurrency"
        imageUrl="/fund.png"
        votes={45}
        progress={8} // Progress out of 30
        solRaised="8.9 SOL"
        expiresIn="7d : 6h : 21m : 46s"
      />
      <Market />
    </div>
  );
}
