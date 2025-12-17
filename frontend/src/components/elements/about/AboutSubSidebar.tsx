import React, { useState } from "react";

interface AboutSubSidebarProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const SidebarItem: React.FC<{ title: string; isActive: boolean; onClick: () => void }> = ({ title, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`self-stretch px-3 py-2 border-l-4 cursor-pointer transition-colors duration-200 rounded-lg md:rounded-none ${
      isActive
        ? "border-[#07b3ff] bg-[#232a32] text-[#07b3ff] font-bold"
        : "border-transparent text-[#838587] hover:border-[#07b3ff] hover:text-[#07b3ff]"
    } inline-flex justify-start items-center`}
  >
    <div className="flex-1 justify-start text-base font-normal font-['Rubik'] leading-normal">
      {title}
    </div>
  </div>
);

const AboutSubSidebar: React.FC<AboutSubSidebarProps> = ({ selectedIndex, setSelectedIndex }) => {
  const items = [
    "What is Speculape?",
    "How do prediction markets work?",
    "Is Speculape safe and secure?",
    "How do I participate?",
    "What can I predict on Speculape?",
    "How does Speculape make money?",
  ];

  return (
    <div className="w-full md:w-auto flex flex-row md:flex-col items-start md:items-stretch gap-1 md:gap-2.5 px-2 md:px-0 py-2 md:py-0 bg-transparent">
      {items.map((title, index) => (
        <SidebarItem
          key={index}
          title={title}
          isActive={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
};

export default AboutSubSidebar;