import React from "react";

interface ProgressBarProps {
  yesPercentage: number; // The percentage for the 'Yes' blocks
}

const ProgressBar: React.FC<ProgressBarProps> = ({ yesPercentage }) => {
  const noPercentage = 100 - yesPercentage;

  // Calculate the number of blocks based on the percentage
  const yesBlocks = Math.round((yesPercentage / 100) * 50); // 50 blocks in total
  const noBlocks = 50 - yesBlocks; // Remaining blocks for "No"

  return (
    <div className="self-stretch flex-1 p-2.5 bg-[#111111] rounded-xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-1">
      {/* Yes Percentage */}
      <div className="w-8 justify-start text-[#3fd145] text-sm font-semibold font-interSemi leading-tight animate-pulse">
        {yesPercentage}%
      </div>

      {/* Progress Bar Blocks */}
      <div className="flex-1 self-stretch flex justify-start items-center gap-[3px]">
        {/* Yes Blocks */}
        {Array.from({ length: yesBlocks }).map((_, index) => (
          <div
            key={`yes-${index}`}
            className="flex-1 self-stretch bg-[#3fd145] rounded-[100px] animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}

        {/* No Blocks */}
        {Array.from({ length: noBlocks }).map((_, index) => (
          <div
            key={`no-${index}`}
            className="flex-1 self-stretch bg-[#ff6464] rounded-[100px] animate-pulse"
            style={{ animationDelay: `${(yesBlocks + index) * 50}ms` }}
          />
        ))}
      </div>

      {/* No Percentage */}
      <div className="w-8 text-right justify-start text-[#ff6464] text-sm font-semibold font-interSemi leading-tight animate-pulse">
        {noPercentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
