"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

interface HistoryItemProps {
  imageUrl: string;
  question: string;
  status: "Ongoing" | "Won" | "Lost";
  percentage: string;
  answer: "Yes" | "No";
  amount: string;
}

const HistoryItem = (param: any) => {
  const { publicKey } = useWallet();
  const [percentage, setPercentage] = useState(0);
  const [answer, setAnswer] = useState("Yes");
  const [amount, setAmount] = useState("Yes");
  // Define status colors dynamically
  const statusColors = {
    Ongoing: "bg-[#3fd145]/10 text-[#3fd145]",
    Won: "bg-[#0054f5]/10 text-[#07b3ff]",
    Lost: "bg-[#ff6464]/10 text-[#ff6464]",
  };
  
  // const answerColor = answer === "Yes" ? "text-[#3fd145]" : "text-[#ff6464]";
  const answerColor = "text-[#ff6464]";
  useEffect(() => {
    let playerList = param.playerA.find((p:any) => p.player === publicKey?.toBase58());
    let totalPlayAmount = 0;
    if (playerList) {
        totalPlayAmount = param.playerA.reduce((sum:any, i:any) => sum + i.amount, 0);
    } else {
        playerList = param.playerB.find((p:any) => p.player === publicKey?.toBase58());
        totalPlayAmount = param.playerB.reduce((sum:any, i:any) => sum + i.amount, 0);
        setAnswer("No")
    }

    if (!playerList) {
        return
    }
    const percentage = playerList?.amount / totalPlayAmount * 100;
    setAmount(playerList?.amount);
    setPercentage(percentage);
  }, []);
  return (
    <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
      <img className="w-8 h-8 rounded-lg" src={param.imageUrl} alt="Market Icon" />
      <div className="flex-1 justify-center text-white text-sm font-medium font-satoshi leading-relaxed w-1/4">
        {param.question}
      </div>
      <div className="w-[100px] rounded-[100px] inline-flex flex-col justify-center items-start">
        <div
          className={`px-2.5 ${statusColors["Ongoing"]} rounded-[100px] inline-flex justify-center items-center gap-2.5`}
        >
          <div className="justify-start text-sm font-medium font-satoshi leading-normal">
            {param.marketStatus}
          </div>
        </div>
      </div>
      <div className="w-[100px] flex justify-start center items-center gap-1">
        <div className="justify-start text-[#838587] text-sm font-medium font-satoshi leading-relaxed">
          {percentage.toFixed(1)} %
        </div>
        <div
          className={`w-[30px] justify-start ${answerColor} text-sm font-medium font-satoshi leading-relaxed`}
        >
          {answer}
        </div>
      </div>
      <div className="w-[100px] justify-start text-white text-sm font-medium font-['Inter'] leading-relaxed">
        {amount}
      </div>
    </div>
  );
};

export default HistoryItem;
