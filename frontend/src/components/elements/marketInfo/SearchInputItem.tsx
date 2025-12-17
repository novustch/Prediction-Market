"use client";

import React, { useState } from "react";

interface SearchInputProps {
  title?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

const SearchInputItem: React.FC<SearchInputProps> = ({
  title = "Volume",
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
}) => {
  const [minVolume, setMinVolume] = useState<number | "">("");
  const [maxVolume, setMaxVolume] = useState<number | "">("");

  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <div className="self-stretch justify-start text-[#838587] text-xs font-normal font-satoshi leading-3">
        {title}
      </div>
      <div className="self-stretch inline-flex justify-start items-center gap-1">
        <div className="w-[120px] px-3 py-2 bg-[#111111] rounded-lg outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center">
          <input
            type="number"
            placeholder={minPlaceholder}
            value={minVolume}
            onChange={(e) => setMinVolume(e.target.value ? Number(e.target.value) : "")}
            className="flex-1 bg-transparent text-[#838587] text-xs font-normal font-satoshi leading-3 outline-none"
          />
        </div>
        <div className="w-[120px] px-3 py-2 bg-[#111111] rounded-lg outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center">
          <input
            type="number"
            placeholder={maxPlaceholder}
            value={maxVolume}
            onChange={(e) => setMaxVolume(e.target.value ? Number(e.target.value) : "")}
            className="flex-1 bg-transparent text-[#838587] text-xs font-normal font-satoshi leading-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInputItem;