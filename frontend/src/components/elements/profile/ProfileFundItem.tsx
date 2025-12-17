import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";

interface ProfileFundItemProps {
  image: string;
  title: string;
  status: "Pending" | "Active" | "Expired";
  betAmount: number;
  percentage: number;
  value: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-[#3fd145]/10 text-[#3fd145]",
  ACTIVE: "bg-[#0054f5]/10 text-[#07b3ff]",
  Expired: "bg-[#ff6464]/10 text-[#ff6464]",
};

const ProfileFundItem = (param: any) => {
  const [betAmount, setBetAmount] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const { publicKey } = useWallet();
  useEffect(() => {
    const userFund = param.investors.find((f:any) => f.investor === publicKey?.toBase58());
    const totalAmount = param.investors.reduce((sum:any, i:any) => sum + i.amount, 0);
    
    setBetAmount(userFund.amount);
    setPercentage(userFund.amount/totalAmount*100);
  }, [])
  return (
    <div className="self-stretch p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-start items-center gap-3">
      <img className="w-8 h-8 rounded-lg" src={param.imageUrl} alt="market-icon" />
      <div className="flex-1 justify-center text-white text-sm font-medium font-satoshi leading-relaxed">
        {param.question}
      </div>
      <div className="w-[100px] rounded-[100px] inline-flex flex-col justify-center items-start">
        <div
          className={`px-2.5 ${statusColors[param.marketStatus]} rounded-[100px] inline-flex justify-center items-center gap-2.5`}
        >
          <div className="justify-start text-sm font-medium font-satoshi leading-normal">
            {param.marketStatus}
          </div>
        </div>
      </div>
      <div className="w-[120px] flex justify-start items-center gap-1">
        {/* <div className="justify-start text-[#838587] text-sm font-medium font-satoshi leading-relaxed">
          {betAmount} SOL /
        </div> */}
        <div className="w-[50px] justify-start text-[#3fd145] text-sm font-medium font-satoshi leading-relaxed">
          {percentage.toFixed(1)}%
        </div>
      </div>
      <div className="w-[100px] justify-start text-white text-sm font-medium font-interSemi leading-relaxed">
        {betAmount} SOL
      </div>
    </div>
  );
};

export default ProfileFundItem;
