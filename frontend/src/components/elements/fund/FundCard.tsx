import React from "react";
import Icon from "../Icons";
import { CiStar } from "react-icons/ci";
import { GiAlarmClock } from "react-icons/gi";
import { GoArrowDownRight } from "react-icons/go";

interface FundInfoProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  votes: number;
  progress: number;
  solRaised: string;
  expiresIn: string;
}

const FundCard: React.FC<FundInfoProps> = ({
  title,
  description,
  category,
  imageUrl,
  votes,
  progress,
  expiresIn,
}) => {
  return (
    <div className="sm:p-6 p-4 bg-[#1e1e1e] rounded-2xl outline-1 flex-col lg:flex-row  outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-start gap-8">
      <img
        className="xl:w-[327px] w-[150px] h-[150px] xl:h-[327px] rounded-2xl hidden lg:flex"
        src={imageUrl}
        alt="Fund Image"
      />
      <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch inline-flex justify-start items-start gap-2 relative">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-[#07b3ff] text-base font-semibold font-interSemi leading-normal">
                {category}
              </div>
            </div>
            <div className="self-stretch justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
              {title}
            </div>
          </div>
          <div className="flex absolute top-0 right-0 gap-1">
            <div
              data-size="Medium"
              data-type="Tertiary"
              className="  cursor-pointer rounded-2xl  flex justify-start items-center gap-2"
            >
              <div className="w-5 h-5 relative overflow-hidden cursor-pointer">
                <Icon name="Message" size={20} />
              </div>
              <div className="justify-start text-white text-base font-medium font-satoshi leading-7">
                {votes}
              </div>
            </div>
            <div className=" cursor-pointer rounded-2xl flex justify-center items-center gap-2">
              <div className="w-6 h-6 relative overflow-hidden cursor-pointer">
                <CiStar className="text-white font-extrabold text-[24px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-2 overflow-hidden">
            <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
              Descriptions:
            </div>
            <div className="self-stretch justify-start">
              <span className="text-white text-lg font-medium font-satoshi leading-relaxed">
                {description}
              </span>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-center cursor-pointer items-end gap-2">
              <div className="justify-start text-[#3fd145] text-base font-medium font-satoshi leading-relaxed">
                Read more
              </div>
              <div className="w-4 h-4 relative overflow-hidden">
                <GoArrowDownRight size={16} className="text-[#3fd145]" />
              </div>
            </div>
            <div className="text-center justify-start text-[#838587] text-sm font-medium font-satoshi">
              Note: This event is legally protected
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 lg:w-auto w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-white text-2xl font-bold font-satoshi capitalize leading-loose">
            Start funding on this
          </div>
          <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex flex-col justify-start items-start gap-4">
            <div className="self-stretch h-[23px] inline-flex justify-between items-center">
              {/* Progress bar */}
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className={`w-[11px] self-stretch rounded-[100px] ${
                    index < progress ? "bg-[#3fd145]" : "bg-[#838587]"
                  }`}
                />
              ))}
            </div>
            <div className="self-stretch rounded-xl inline-flex justify-between items-center">
              <div className="justify-start">
                <span className="text-[#3fd145] text-lg font-semibold font-interSemi leading-relaxed">
                  {progress}
                </span>
                <span className="text-[#838587] text-lg font-semibold font-interSemi leading-relaxed">
                  / 30
                </span>
              </div>
              <div className="text-right justify-start text-white text-lg font-semibold font-interSemi leading-relaxed">
                SOL Raised
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-xl inline-flex justify-between items-center gap-4">
            <div className="text-right justify-start text-white text-base font-normal font-interSemi leading-relaxed">
              Expires in
            </div>
            <div className="px-3 py-2 bg-[#3fd145]/10 rounded-xl flex justify-start items-center gap-2">
              <div className="w-5 h-5 relative overflow-hidden">
                <GiAlarmClock size={19} className="text-[#3fd145]" />
              </div>
              <div className="justify-start text-[#3fd145] text-lg font-medium font-satoshi leading-relaxed">
                {expiresIn}
              </div>
            </div>
          </div>
        </div>
        <div
          data-size="Big"
          data-type="Prime"
          className="self-stretch cursor-pointer px-6 py-3.5 bg-[#07b3ff] rounded-2xl 
  shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] 
  inline-flex justify-center items-center gap-2 transition-all duration-300 ease-in-out 
  hover:bg-[#0595d3] hover:scale-102 hover:shadow-lg active:scale-100"
        >
          <div
            className="text-[#111111] text-xl font-medium font-satoshi leading-7 
    transition-all duration-300 ease-in-out"
          >
            Fund now
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
