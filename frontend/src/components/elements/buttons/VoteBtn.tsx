"use client";

import React from "react";
import Icon from "../Icons";

interface VoteButtonProps {
  onClick: () => void;
  label: string;
  color: string; // Example: "#3fd145" or "#ff6464"
  icon: "yes" | "no"; // Example: "check", "cross"
}

const VoteButton: React.FC<VoteButtonProps> = ({
  onClick,
  label,
  color,
  icon,
}) => {
  return (
    <button
      className={`flex-1 px-4 py-2.5 bg-[${color}]/10 rounded-2xl cursor-pointer hover:bg-[${color}]/20 outline-1 outline-offset-[-1px] outline-[${color}] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.16)]
                 flex justify-center items-center gap-2`}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div className="w-5 h-5 relative overflow-hidden">
        <Icon name={icon} color={color} />
      </div>

      {/* Button Label */}
      <div
        className={`justify-start text-[${color}] lg:text-lg text-base font-bold font-satoshi leading-7`}
      >
        {label}
      </div>
    </button>
  );
};

export default VoteButton;
