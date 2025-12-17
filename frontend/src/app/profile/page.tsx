"use client";
import HistoryItem from "@/components/elements/profile/HistoryItem";
import ProfileFundItem from "@/components/elements/profile/ProfileFundItem";
import ProfileNavbar from "@/components/elements/profile/ProfileNavbar";
import ProfileProposeItem from "@/components/elements/profile/ProfileProposeItem";
import { errorAlert } from "@/components/elements/ToastGroup";
import { elipsKey, stylizeFloat } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { useEffect, useState } from "react";

const historyData = [
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "20%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Who will win the 2025 election?",
    status: "Won",
    percentage: "13%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "56%",
    answer: "No",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Won",
    percentage: "75%",
    answer: "Yes",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Liverpool win the 2024 Premier League",
    status: "Lost",
    percentage: "44%",
    answer: "No",
    amount: "150.45",
  },
  {
    imageUrl: "https://placehold.co/32x32",
    question: "Will Bitcoin hit 100K by April?",
    status: "Ongoing",
    percentage: "89%",
    answer: "Yes",
    amount: "150.45",
  },
] as const;

const funds = [
  {
    image: "https://placehold.co/32x32",
    title: "Will Bitcoin hit 100K by April?",
    status: "Pending",
    betAmount: 5,
    percentage: 20,
    value: "$150.45",
  },
  {
    image: "https://placehold.co/32x32",
    title: "Who will win the 2025 election?",
    status: "Active",
    betAmount: 2,
    percentage: 50,
    value: "$150.45",
  },
  {
    image: "https://placehold.co/32x32",
    title: "Liverpool win the 2024 Premier League",
    status: "Expired",
    betAmount: 13,
    percentage: 86,
    value: "$150.45",
  },
] as const;

const proposals = [
  {
    image: "https://placehold.co/32x32",
    title: "Will Bitcoin hit 100K by April?",
    status: "Pending",
    timeLeft: "3d 2h",
    betAmount: 8.9,
    totalAmount: 20,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Who will win the 2025 election?",
    status: "Active",
    timeLeft: "4h 55m",
    betAmount: 12.5,
    totalAmount: 25,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will ETH surpass $5K by June?",
    status: "Expired",
    timeLeft: "-",
    betAmount: 15,
    totalAmount: 30,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will Solana flip Ethereum in market cap?",
    status: "Pending",
    timeLeft: "10d 8h",
    betAmount: 5,
    totalAmount: 15,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will the S&P 500 reach a new ATH in 2025?",
    status: "Active",
    timeLeft: "2d 5h",
    betAmount: 7.2,
    totalAmount: 18,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will AI stocks outperform the market in 2025?",
    status: "Expired",
    timeLeft: "-",
    betAmount: 6.3,
    totalAmount: 12,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will the Fed cut interest rates this year?",
    status: "Pending",
    timeLeft: "6d 4h",
    betAmount: 10,
    totalAmount: 22,
  },
  {
    image: "https://placehold.co/32x32",
    title: "Will Tesla stock reach $1000 in 2025?",
    status: "Active",
    timeLeft: "7h 30m",
    betAmount: 9,
    totalAmount: 21,
  },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "Betting History" | "Funded Market" | "Proposed Market"
  >("Betting History");

  const [profileData, setProfileData] = useState<any>();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      errorAlert("Please connect wallet!");
      return
    }
    (async() =>{
      const res = await axios.get(`${API_ENDPOINTS.PROFILE.GET}?wallet=${publicKey.toBase58()}`);
      
      setProfileData(res.data);
    })();
  }, [publicKey]); 
  return (
    <div className="self-stretch h-[1184px] px-[50px] flex-col lg:flex-row inline-flex justify-start items-start gap-[50px] overflow-auto">
      <div className="lg:w-[680px] flex-col lg:flex-row p-6 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-start gap-4">
        {/* <img
          className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-[10px] border border-white"
          src="https://placehold.co/100x100"
          alt=""
        /> */}
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 h-[100px] inline-flex flex-col justify-center items-start gap-1">
              <div className="justify-start text-[#3fd145] text-[32px] font-medium font-satoshi leading-loose">
                User One
              </div>
              {/* <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                @speculapeuser
              </div> */}
            </div>
            <div className="flex-1 h-[100px] flex justify-end items-center gap-1">
              <div className="px-3 py-1 rounded-[100px] outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-1">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-[5.50px] h-[1.50px] left-[5px] top-[7px] absolute bg-[#838587]" />
                  <div className="w-[9px] h-2 left-[14px] top-[8px] absolute bg-[#838587]" />
                  <div className="w-[19.14px] h-[17.50px] left-[2px] top-[3px] absolute opacity-50 bg-[#838587]" />
                </div>
                <div className="justify-start text-[#07b3ff] text-xl font-medium font-satoshi leading-relaxed">
                  {publicKey?.toBase58() ?elipsKey(publicKey?.toBase58()):""}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  {" "}
                  Total Portfolio Value
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData?parseFloat(Number(profileData.earnedFeeLiquidity / 1000000000 + profileData.totalLiquidityProvided).toFixed(9)).toString(): 0}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Active Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? profileData.activeBet : 0}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? profileData.totalBet : 0}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Liquidity Provided
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? parseFloat(Number(profileData.totalLiquidityProvided).toFixed(9)).toString() : 0} SOL
                </div>
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Fees Earned From Liquidity
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? parseFloat(Number(profileData.earnedFeeLiquidity / 1000000000).toFixed(9)).toString() : 0} SOL
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Earning From Bet
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  ${profileData? profileData.earnedBet : 0}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Proposed Market
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? profileData.totalProposedMarket : 0}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  Total Referrals
                </div>
                <div className="self-stretch justify-start text-white text-xl font-medium font-satoshi leading-relaxed">
                  {profileData? profileData.totalreferrals : 0}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-[11px]">
        <ProfileNavbar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Betting History" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Betting History
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Odds
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Bet Amount
              </div>
            </div>
            {profileData? profileData.bettingHistory.map((item: any, index: number) => (
              <HistoryItem key={index} {...item} />
            )): ""}
          </>
        )}

        {activeTab === "Funded Market" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Funded Market
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Percentage
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Ext. Payment
              </div>
            </div>
            {profileData? profileData.fundedMarkets.map((fund: any, index: any) => (
              <ProfileFundItem key={index} {...fund} />
            )): ""}
          </>
        )}

        {activeTab === "Proposed Market" && (
          <>
            <div className="self-stretch justify-start text-white text-[28px] font-medium font-['Rubik'] leading-[48px]">
              All Proposed Market
            </div>
            <div className="self-stretch px-4 py-2 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
              <div className="w-8 opacity-0 text-right justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                St
              </div>
              <div className="flex-1 justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Name
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Status
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Exp. in
              </div>
              <div className="w-[100px] justify-center text-[#838587] text-base font-medium font-satoshi leading-none">
                Initial Liquidity
              </div>
            </div>
            {profileData? profileData.proposedMarket.map((proposal: any, index: any) => (
              <ProfileProposeItem key={index} {...proposal} />
            )) : ""}
          </>
        )}

      </div>
    </div>
  );
}
