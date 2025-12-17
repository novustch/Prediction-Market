import Icon from "@/components/elements/Icons";
import { SidebarNavItemProps } from "@/types/type";
import Link from "next/link";
import { FC } from "react";

const SidebarNavItem: FC<SidebarNavItemProps> = ({
  label,
  href,
  isActive,
  onClick,
  isCollapsed,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`self-stretch transition-all duration-300 ease-in-out 
        ${
          isCollapsed
            ? "p-[14px] md:justify-center"
            : "px-5 py-3 gap-3 justify-start items-center"
        } 
        ${
          isActive
            ? "bg-gradient-to-r from-blue/10 to-white/0 rounded-xl outline-blue outline-1 outline-offset-[-1px]"
            : "hover:bg-[#2a2a2a] hover:rounded-xl"
        }
        inline-flex items-center gap-3 cursor-pointer z-1`}
    >
      <Icon
        name={label}
        size={24}
        color={isActive ? "#07b3ff" : "#838587"}
        className="transition-all duration-300 ease-in-out hover:scale-110"
      />

      {/* Hide label when collapsed */}
      {!isCollapsed && (
        <div
          className={`justify-start font-satoshi text-xl font-medium leading-7 transition-all duration-300 ease-in-out
          ${isActive ? "text-blue" : "text-gray"}`}
        >
          {label}
        </div>
      )}

      <div
        className={`justify-start md:hidden font-satoshi text-xl font-medium leading-7 transition-all  duration-300 ease-in-out
          ${isActive ? "text-blue" : "text-gray"}`}
      >
        {label}
      </div>
    </Link>
  );
};

export default SidebarNavItem;
