"use client";
import { SidebarNavProps } from "@/types/type";
import SidebarNavItem from "./SidebarNavItem";
import { useState } from "react";

const sidebarNavList = [
  { label: "Home", href: "/" },
  { label: "FundMarket", href: "/fund" },
  { label: "ProposeMarket", href: "/propose" },
  { label: "Referral", href: "/referral" },
  { label: "Profile", href: "/profile" },
  { label: "About", href: "/about" },
] as const;

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed }) => {
  // Set the default active item to "Home"
  const [activeItem, setActiveItem] = useState<string>("Home");

  return (
    <nav className="flex grow p-6 flex-col items-start gap-5 flex-[1_0_0] relative self-stretch">
      {sidebarNavList.map(({ label, href }) => (
        <SidebarNavItem
          key={label}
          label={label}
          href={href}
          isActive={activeItem === label}
          onClick={() => setActiveItem(label)}
          isCollapsed={isCollapsed} // Pass the prop
        />
      ))}
      {/* Bottom Image - Hide when Collapsed */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-1.5">
          <img
            src="/spec.png"
            className="w-[221px] h-[210px] left-[-44px] top-[801px]  mix-blend-screen"
          />
        </div>
      )}
      <div className="md:hidden absolute bottom-0 left-1.5">
          <img
            src="/spec.png"
            className="w-[221px] h-[210px] left-[-44px] top-[801px]  mix-blend-screen"
          />
        </div>
    </nav>
  );
};

export default SidebarNav;
