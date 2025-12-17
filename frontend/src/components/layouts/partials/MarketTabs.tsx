import { useState } from "react";
import Icon from "@/components/elements/Icons";

const tabs = [
  { key: "ActiveMarket", label: "Active Market", icon: "ActiveMarket" },
  { key: "PendingMarket", label: "Pending Market", icon: "PendingMarket" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const MarketTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("ActiveMarket");

  return (
    <div className="p-0.5 bg-[#111111] rounded-[18px] outline-1 outline-offset-[-1px] outline-[#313131] flex">
      {tabs.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all duration-300
            ${activeTab === key 
              ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] shadow-[inset_0px_-2px_0px_0px_rgba(27,27,27,1.00)]"
              : "bg-transparent"
            }`}
        >
          <Icon name={icon} color={activeTab === key ? "#FF6464" : "#838587"} />
          <span className={`text-base font-medium font-satoshi leading-normal ${activeTab === key ? "text-white" : "text-[#838587]"}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MarketTabs;
