"use client";

import Icon from "@/components/elements/Icons";
import Link from "next/link";
import SidebarNav from "../partials/SidebarNav";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { RxCross2 } from "react-icons/rx";

interface HeaderSideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isCancel?: boolean;
  setIsCanceled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSideBar = ({ isCollapsed, setIsCollapsed, isCancel, setIsCanceled }: HeaderSideBarProps) => {
  const { width } = useWindowSize();

  return (
    <div
      className={`hidden md:flex fixed top-0 left-0 h-screen z-30 ${isCollapsed ? "w-[104px]" : "w-[280px]"} bg-[#1E1E1E] flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div
        className={`md:flex hidden flex-none items-center h-20 gap-2 px-6 py-[30px] shrink-0 self-stretch transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-start"
          }`}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Link href="/">
            <Icon name="Logo" size={48} />
          </Link>
          {!isCollapsed && (
            <Link
              href="/"
              className="text-4xl leading-9 font-normal font-['anton'] text-white uppercase"
            >
              speculape
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden self-stretch h-[60px] px-5 py-3 inline-flex justify-start items-center gap-2">
        <div
          onClick={() => setIsCanceled && setIsCanceled(!isCancel)}
          className="w-4 h-4 relative overflow-hidden"
        >
          <RxCross2 className="text-white" />
        </div>
        <div className="flex-1 flex justify-start items-center gap-0.5">
          <Link href="/">
            <Icon name="Logo" size={24} />
          </Link>
          <Link
            href="/"
            className="text-xl leading-9 font-normal font-['anton'] text-white uppercase"
          >
            speculape
          </Link>
        </div>
        <div className="px-3 py-1.5 bg-[#282828] rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] flex justify-start items-center gap-1">
          <div className="justify-start text-white text-sm font-medium font-satoshi leading-normal">
            EN
          </div>
          <Icon
            name="Down"
            className="transition-all duration-300 ease-in-out hover:rotate-180"
          />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav isCollapsed={isCollapsed} />

      {/* Social Links */}

      <div
        className={` self-stretch p-6  flex-col ${isCollapsed
          ? "flex justify-center items-center"
          : " justify-start items-start inline-flex"
          } flex-none gap-6  bottom-0`}
      >
        {!isCollapsed && (
          <div className="self-stretch justify-start px-3">
            <span className="text-white text-xl font-medium font-satoshi leading-loose">
              Follow us
            </span>
            <span className="text-[#838587] text-xl font-medium font-satoshi leading-loose">
              {" "}
              on <br />
              social media
            </span>
          </div>
        )}
        <div
          className={`flex flex-col ${isCollapsed
            ? "md:justify-center md:items-center"
            : "justify-start items-start"
            } gap-2`}
        >
          <Link
            href="#"
            className="p-3 bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] inline-flex justify-start items-center gap-2"
          >
            <FaInstagram className="text-white" />
            {!isCollapsed && (
              <div className="justify-start text-white text-base font-medium font-satoshi leading-normal">
                Instagram
              </div>
            )}
            <div className="md:hidden justify-start text-white text-base font-medium font-satoshi leading-normal">
              Instagram
            </div>
          </Link>
          <Link
            href="#"
            className="p-3 bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] inline-flex justify-start items-center gap-2"
          >
            <FaXTwitter className="text-white" />
            {!isCollapsed && (
              <div className="justify-start text-white text-base font-medium font-satoshi leading-normal">
                X (twitter)
              </div>
            )}
            <div className="md:hidden justify-start text-white text-base font-medium font-satoshi leading-normal">
              X (twitter)
            </div>
          </Link>
        </div>
      </div>

      <div
        data-size="Small"
        data-type="Tertiary"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`w-8 p-2  ${isCollapsed ? "left-[120px] top-[56px]" : "left-[296px] top-[56px]"
          } absolute origin-top-left hover:bg-[#3a3a3a] rotate-180 cursor-pointer bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] md:inline-flex hidden justify-start items-center gap-2`}
      >
        <div className="inline-flex flex-col justify-start items-start overflow-hidden">
          <div className="rounded-[3px]" />
          <div className="w-4 h-4 overflow-hidden outline-[1.50px] outline-offset-[-0.75px] outline-white">
            <Icon
              name={isCollapsed ? "ArrowRight" : "ArrowLeft"}
              color={"white"}
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSideBar;
