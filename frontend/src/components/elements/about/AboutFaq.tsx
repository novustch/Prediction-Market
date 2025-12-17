import React, { useState } from "react";

interface SidebarItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`self-stretch pl-${isActive ? "4" : "7"} py-2 border-l cursor-pointer transition-colors duration-200 ${
      isActive ? "border-[#07b3ff] text-[#07b3ff]" : "border-[#838587] text-[#838587] hover:border-[#07b3ff] hover:text-[#07b3ff]"
    } inline-flex justify-start items-center gap-2.5`}
  >
    <div className="flex-1 justify-start text-base font-normal font-['Rubik'] leading-normal">
      {title}
    </div>
  </div>
);

const SidebarFaq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const items = [
    "ChainTrend: Democratizing Finance Through Innovation",
    "An Unprecedented Asset Class: Event Contracts",
    "Leveling the Playing Field",
    "A Marketplace of Ideas",
    "The Power of Yes & No",
    "Our Commitment",
  ];

  return (
    <div className="self-stretch px-10 py-6 border-l border-[#313131] flex justify-start items-start gap-2.5">
      <div className="w-56 inline-flex flex-col justify-start items-start">
        {items.map((title, index) => (
          <SidebarItem key={index} title={title} isActive={index === activeIndex} onClick={() => setActiveIndex(index)} />
        ))}
      </div>
    </div>
  );
};

export default SidebarFaq;
