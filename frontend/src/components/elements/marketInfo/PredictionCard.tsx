"use client";

import React, { useEffect } from "react";
import { FaRegClock, FaRegStar } from "react-icons/fa6";
import Icon from "../Icons";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { elipsKey, getCountDown } from "@/utils";
import { useGlobalContext } from "@/providers/GlobalContext";
import { marketBetting } from "@/components/prediction_market_sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { errorAlert, infoAlert } from "../ToastGroup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MarketDataType } from "@/types/type";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "@/config/api";

// Define types for the props
interface PredictionCardProps {
  index: number,
  currentPage: number
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  index,
  currentPage
}) => {
  const { markets, formatMarketData } = useGlobalContext(); // Use Global Context
  const wallet = useAnchorWallet()
  const router = useRouter()
  const [counter, setCounter] = useState("7d : 6h : 21m : 46s");
  useEffect(() => {
    const interval = setInterval(() => {
      let remainTime: string = getCountDown(markets[index].date);
      setCounter(remainTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const onVote = async (isYes: boolean, token: string) => {
    try {
      if (!wallet) {
        errorAlert("Please connect wallet!");
        return
      }
      const result = await marketBetting({
        creator: markets[index].creator,
        player: wallet,
        marketId: markets[index]._id,
        market: markets[index].market,
        amount: 1000,
        isYes: isYes,
        token: token,
      });

      const res = await axios.post(API_ENDPOINTS.MARKET.BETTING, {
        player: wallet.publicKey.toBase58(),
        market_id: markets[index]._id,
        amount: 1000,
        isYes,
        currentPage,
        ...result
      });

      if (res.status === 200) {
        infoAlert("Successfully betted!");
        const marketData = await axios.get(`${API_ENDPOINTS.MARKET.GET}?page=${currentPage}&limit=10&marketStatus=ACTIVE&marketField=0`);
        formatMarketData(marketData.data.data);
      }
    } catch (error) {
      console.log(error);
      errorAlert("Betting Filed!")
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(7,179,255,0.10)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="lg:p-6 p-4 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] shadow-xl/20 outline-[#313131] inline-flex flex-col justify-start items-start lg:gap-6 gap-4"
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="flex-1 justify-start text-[#07b3ff] lg:text-base text-xs font-semibold font-Inter leading-normal">
            {elipsKey(markets[index].feedName)}
          </div>
          <div className="flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative overflow-hidden">
              <Icon name="Message" />
            </div>
            <div className="justify-start text-[#838587] text-sm font-semibold font-interSemi leading-tight">
              {markets[index].comments ?? 0}
            </div>
          </div>
          <div className="lg:w-5 lg:h-5 w-4 h-4 relative overflow-hidden">
            <FaRegStar className="text-white" />
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <div className="flex-1 h-overflow-auto justify-start text-white lg:text-2xl text-lg font-medium font-rubik">
            {markets[index].question}
          </div>
          <img className="lg:w-14 lg:h-14 w-12 h-12 rounded-lg" src={markets[index].imageUrl} alt={markets[index].feedName} />
        </div>
        
        {/* Market Stats */}
        <div className="self-stretch grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-[#838587] text-sm font-semibold">Volume</div>
            <div className="text-white text-sm font-semibold">{markets[index].totalInvestment} SOL</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[#838587] text-sm font-semibold">Time Remaining</div>
            <div className="text-[#3fd145] text-sm font-semibold flex items-center gap-1">
              <FaRegClock className="text-[#3fd145]" />
              {counter}
            </div>
          </div>
        </div>

        {/* Percent Chance Bar */}
        <div className="self-stretch flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-[#838587] text-sm font-semibold">Percent Chance</div>
            <div className="text-white text-sm font-semibold">
              {Math.floor(markets[index].playerACount / (markets[index].playerACount + markets[index].playerBCount) * 100)}%
            </div>
          </div>
          <ProgressBar yesPercentage={(markets[index].playerACount + markets[index].playerBCount) === 0 ? 50 : Math.floor(markets[index].playerACount / (markets[index].playerACount + markets[index].playerBCount) * 100)} />
        </div>
      </div>

      {/* Yes/No Buttons */}
      <div className="self-stretch inline-flex justify-start items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2.5 bg-[#223a25] outline outline-[#3fd145] rounded-2xl cursor-pointer transition-all duration-200 flex justify-center items-center gap-2"
          onClick={() => onVote(true, markets[index].tokenA)}
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <Icon name="yes" color="#3fd145" />
          </span>
          <span className="text-[#3fd145] text-lg font-bold font-satoshi leading-7">Yes</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2.5 bg-[#3a2222] outline outline-[#ff6464] rounded-2xl cursor-pointer transition-all duration-200 flex justify-center items-center gap-2"
          onClick={() => onVote(false, markets[index].tokenB)}
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <Icon name="no" color="#ff6464" />
          </span>
          <span className="text-[#ff6464] text-lg font-bold font-satoshi leading-7">No</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PredictionCard;
