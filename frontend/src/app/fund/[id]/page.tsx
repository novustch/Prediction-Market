"use client";
import FundNavbar from "@/components/elements/fund/FundNavbar";
import SolCounter from "@/components/elements/fund/SolCounter";
import Icon from "@/components/elements/Icons";
import { CiStar } from "react-icons/ci";
import { GoArrowDownRight, GoQuestion } from "react-icons/go";
import { ImAlarm } from "react-icons/im";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/providers/GlobalContext";
import { marketField } from "@/data/data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCountDown } from "@/utils";
import { depositLiquidity } from "@/components/prediction_market_sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { errorAlert, infoAlert } from "@/components/elements/ToastGroup";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

export default function FundDetail() {
  const { markets } = useGlobalContext(); // Ensure setActiveTab exists in context
  const [counter, setCounter] = useState("7d : 6h : 21m : 46s");
  const [fundAmount, setAmount] = useState(0);
  const router = useRouter();
  const wallet = useWallet();

  if (markets.length === 0) {
    router.replace("/fund"); // Navigate to dynamic page
    return
  }

  const param = useParams();
  const index = Number(param.id);
  const market = markets[index];

  useEffect(() => {
    const interval = setInterval(() => {
      let remainTime = getCountDown(market.date);
      setCounter(remainTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onFund = async () => {
    try {
      if (!wallet.connected) {
        errorAlert("Failed funding")
        return
      }
      const status = await depositLiquidity({ amount: fundAmount, market_id: market.market, wallet });
      console.log("fundAmount:", fundAmount );
      
      const active = status === "active" ? true : false;

      console.log("status:", active);

      const result = await axios.post(API_ENDPOINTS.MARKET.LIQUIDITY, { market_id: market._id, amount: fundAmount, investor: wallet.publicKey?.toBase58(), active });

      if (result.status === 200) {
        infoAlert("Funed successfully!");
        router.replace(`/fund`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      errorAlert("Failed deploying fund!")
    }
  }
  return (
    <div className="self-stretch px-[50px] inline-flex flex-col justify-start items-start gap-[50px] overflow-auto">
      <div className="self-stretch inline-flex justify-start items-start gap-2 ">
        <div className="justify-start text-[#838587] text-lg font-normal cursor-pointer font-rubic leading-relaxed">
          {marketField[market.marketField].name}
        </div>
        <div className="justify-start text-[#838587] text-lg font-normal font-rubic leading-relaxed">
          {">"}
        </div>
        <div className="justify-start text-white text-lg font-normal font-rubic leading-relaxed">
          {market.question}
        </div>
      </div>
      <div className="self-stretch inline-flex flex-col lg:flex-row justify-start items-start gap-[50px]">
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch p-6 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-start gap-10">
            <div className="self-stretch inline-flex justify-start items-start gap-8">
              <img
                className="2xl:w-[264px] 2xl:h-[264px] xl:w-[200px] xl:h-[200px] hidden rounded-2xl"
                src="/fund.png"
                alt=""
              />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-6 relative">
                <div className="self-stretch inline-flex  justify-start items-start gap-2">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                    <div className="inline-flex justify-start items-center gap-2">
                      <div className="justify-start text-[#07b3ff] text-base font-semibold font-interSemi leading-normal">
                        {marketField[market.marketField].name}
                      </div>
                    </div>
                    <div className="self-stretch justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
                      {market.question}
                    </div>
                  </div>
                  <div className="flex absolute top-0 right-0 gap-1">
                    <div
                      data-size="Medium"
                      data-type="Tertiary"
                      className="  cursor-pointer rounded-2xl flex justify-start items-center gap-2"
                    >
                      <div className="w-5 h-5 relative overflow-hidden cursor-pointer">
                        <Icon name="Message" size={20} />
                      </div>
                      <div className="justify-start text-white text-base font-medium font-satoshi leading-7">
                        45
                      </div>
                    </div>
                    <div className=" cursor-pointer rounded-2xl flex justify-center items-center gap-2">
                      <div className="w-6 h-6 relative overflow-hidden cursor-pointer">
                        <CiStar className="text-white font-extrabold text-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <div className="text-right justify-start text-[#838587] text-lg font-normal font-interSemi leading-relaxed">
                    Expires in
                  </div>
                  <div className="px-3 py-2 bg-[#3fd145]/10 rounded-xl inline-flex justify-start items-center gap-2">
                    <div className="w-5 h-5 relative overflow-hidden flex justify-between items-center">
                      <ImAlarm
                        color="#3fd145"
                        size={25}
                        className="flex justify-between items-center"
                      />
                    </div>
                    <div className="justify-start text-[#3fd145] text-lg font-medium font-satoshi leading-relaxed">
                      {counter}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="text-right justify-start text-[#838587] text-lg font-normal font-interSemi leading-relaxed">
                    Initial Funding
                  </div>
                  <div className="sm:w-[392px] w-[200px] h-[97px] p-4 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch h-[23px] inline-flex justify-between items-center">
                      {Array.from({ length: 20 }).map((_, index) => {
                        const filledSegments = Math.floor((market.totalInvestment / 0.1) * 20);
                        const isFilled = index < filledSegments;
                        return (
                          <div
                            key={index}
                            className={`sm:w-[11px] w-[5px] self-stretch ${
                              isFilled ? 'bg-[#3fd145]' : 'bg-[#838587]'
                            } rounded-[100px] animate-pulse [animation-delay:${index * 100}ms]`}
                          />
                        );
                      })}
                    </div>
                    <div className="self-stretch rounded-xl inline-flex justify-between items-center">
                      <div className="justify-start">
                        <span className="text-[#3fd145] text-lg font-semibold font-interSemi leading-relaxed">
                          {parseFloat(Number(market.totalInvestment).toFixed(9)).toString()}
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
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                    Oracle Resolver
                  </div>
                  <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                    {marketField[market.marketField].content[market.apiType].api_name}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                    Descriptions
                  </div>
                  <div className="self-stretch justify-start">
                    <span className="text-white text-lg font-medium font-satoshi leading-relaxed">
                      {market.description}
                    </span>
                  </div>
                  <div className="self-stretch inline-flex justify-end">
                    {/* <div className="flex justify-center items-end cursor-pointer gap-2">
                      <div className="justify-start text-[#3fd145] text-lg font-medium font-satoshi leading-relaxed">
                        Read more
                      </div>
                      <div className="w-4 h-4 relative overflow-hidden">
                        <GoArrowDownRight color="#3fd145" size={16} />
                      </div>
                    </div> */}
                    <div className="text-center justify-start text-[#838587] text-sm font-medium font-satoshi">
                      Note: This event are legally protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[440px] w-full px-6 pt-6 pb-10 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-center gap-8">
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <div className="justify-start text-white text-[32px] font-medium font-rubik leading-[48px]">
                Fund
              </div>
            </div>
            <div className="self-stretch justify-start text-[#838587] text-lg font-normal font-satoshi leading-relaxed">
              Start funding for this Topic
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <div className="justify-start text-[#838587] text-base font-medium font-satoshi leading-none">
                Amount
              </div>
              <div className="w-4 h-4 relative overflow-hidden">
                <GoQuestion className="text-gray font-bold" />
              </div>
            </div>
            <SolCounter amount={fundAmount} setAmount={setAmount} />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-start text-[#838587] text-base font-medium font-satoshi leading-none">
                Fund Amount
              </div>
              <div className="justify-start text-[#838587] text-base font-bold font-satoshi leading-none">
                {fundAmount} SOL
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="flex justify-start items-center gap-1">
                <div className="justify-start text-[#838587] text-base font-medium font-satoshi leading-none">
                  Yield Rights
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <GoQuestion className="text-gray font-bold" />
                </div>
              </div>
              <div className="justify-start text-[#838587] text-base font-bold font-satoshi leading-none">
                {fundAmount > 0 ? ((fundAmount / (market.totalInvestment + fundAmount)) * 100).toFixed(2) : "0.00"}%
              </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-start text-[#838587] text-base font-medium font-satoshi leading-none">
                Gas Fee
              </div>
              <div className="justify-start text-[#838587] text-base font-bold font-satoshi leading-none">
                0.001 SOL
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-4">
            <div
              data-size="Big"
              data-type="Prime"
              onClick={() => onFund()}
              className="self-stretch px-6 py-3.5 hover:cursor-pointer bg-[#07b3ff] hover:bg-[#07b3ff]/50 rounded-2xl shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] inline-flex justify-center items-center gap-2"
            >
              <div className="justify-start text-[#111111] text-xl font-medium font-satoshi leading-7">
                Fund Now
              </div>
            </div>
            <div className="inline-flex flex-col lg:flex-row justify-start items-center gap-2">
              <div className="justify-start text-[#838587] text-base font-normal font-satoshi leading-none">
                By clicking Fund you agree to
              </div>
              <div className="justify-start text-[#3fd145] text-base font-medium font-satoshi underline leading-none">
                Terms and Conditions
              </div>
            </div>
          </div>
        </div>
      </div>
      <FundNavbar />
    </div>
  );
}
