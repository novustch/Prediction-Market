"use client";

import React from "react";

interface ProfileNavbarProps {
  activeTab: "Betting History" | "Funded Market" | "Proposed Market";
  onTabChange: (tab: "Betting History" | "Funded Market" | "Proposed Market") => void;
}

const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs: ("Betting History" | "Funded Market" | "Proposed Market")[] = [
    "Betting History",
    "Funded Market",
    "Proposed Market",
  ];

  return (
    <div className="h-11 rounded-[18px] inline-flex justify-start items-center gap-2">
      {tabs.map((tab) => (
        <div
          key={tab}
          data-active={activeTab === tab ? "On" : "Off"}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2.5 rounded-2xl flex justify-start items-center gap-2 cursor-pointer
            ${activeTab === tab
              ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] text-white"
              : "outline-1 outline-offset-[-1px] outline-[#313131] text-[#838587]"
            }`}
        >
          <div className="justify-start text-base font-medium font-satoshi leading-normal">
            {tab}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileNavbar;
