"use client"

import { useState } from "react";
import { AboutSection } from "@/components/elements/about/AboutSection";
import AboutSubSidebar from "@/components/elements/about/AboutSubSidebar";

export default function AboutPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-[minmax(220px,260px)_1fr] md:gap-0 bg-[#111212]">
      <div className="md:min-w-[260px] border-r border-[#232323] p-4 md:p-6 flex-shrink-0 bg-transparent">
        <AboutSubSidebar selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </div>
      <div className="flex-1 flex justify-center items-start px-2 md:px-6 py-4 md:py-10">
        <AboutSection selectedIndex={selectedIndex} />
      </div>
    </div>
  );
}
