"use client";

import React, { useState } from "react";
import Market from "@/components/elements/marketInfo/Market";
import RecentList from "@/components/elements/marketInfo/RecentList";
import MarketCarousel from "@/components/elements/carousel/MarketCarousel";
import { useGlobalContext } from "@/providers/GlobalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Home() {
  const pathname = usePathname();
  const { setActiveTab } = useGlobalContext();
  const [showRecentActivity, setShowRecentActivity] = useState(true);

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("ACTIVE");
    }
  }, [pathname, setActiveTab]);

  return (
    <div className="self-stretch sm:px-[42px] px-5 inline-flex flex-col justify-start items-start gap-[50px] overflow-auto">
      <div className="self-stretch relative">
        <MarketCarousel />
      </div>
      <div className="self-stretch inline-flex flex-col 2xl:flex-row justify-start items-start gap-[50px]">
        <div className={`flex-1 ${showRecentActivity ? '2xl:w-[calc(100%-519px)]' : 'w-full'}`}>
          <Market showRecentActivity={showRecentActivity} onToggleRecentActivity={() => setShowRecentActivity(!showRecentActivity)} />
        </div>
        {showRecentActivity && (
          <div className="md:w-[519px] w-full inline-flex flex-col justify-start items-start md:gap-6 gap-4 p-6 rounded-2xl shadow-lg border border-[#333]">
            <div className="self-stretch flex justify-between items-center">
              <div className="text-white text-[32px] font-semibold font-['Rubik'] leading-[48px]">
                Recent Activity
              </div>
            </div>
            <RecentList />
          </div>
        )}
      </div>
    </div>
  );
}
