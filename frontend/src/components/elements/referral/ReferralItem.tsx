"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaCoins } from "react-icons/fa";
import { ReferralType } from "@/types/type";
import { elipsKey, timeAgo } from "@/utils";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { errorAlert, infoAlert } from "../ToastGroup";

const ReferralItem: React.FC<ReferralType> = ({
    wallet,
    referralCode,
    referredLevel,
    fee,
    status,
    wallet_refered,
    createdAt,
}) => {
  const [claiming, setClaiming] = React.useState(false);
  const handleClaim = async (amount: number) => {
    try {
      if (claiming) {
        return
      }

      setClaiming(true);
      const res = await axios.post(API_ENDPOINTS.REFERRAL.CLAIM, {
        wallet,
        amount
      });

      if (res.status === 200) {
        infoAlert("Claimed successfully!");
        setClaiming(false);
      }
    } catch (error) {
      setClaiming(false);
      errorAlert("Failed claiming!");
    }
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full h-[100px] p-4 bg-[#1e1e1e] rounded-xl border border-[#313131] flex items-center justify-between gap-4"
    >
      {/* Left Section - User Info */}
      <div className="flex items-center gap-4 min-w-[300px]">
        <div className="w-12 h-12 flex items-center justify-center bg-[#282828] rounded-lg">
          <FaUser className="text-[#00b4d8] text-xl" />
        </div>
        <div className="flex flex-col">
          <div className="text-white text-lg font-medium font-satoshi">
            {elipsKey(wallet_refered as string)}
          </div>
          <div className="text-[#838587] text-sm font-medium font-satoshi truncate max-w-[200px]">
            {referralCode}
          </div>
        </div>
      </div>

      {/* Right Section - Status and Amount */}
      <div className="flex items-center gap-6">
        {/* Time Ago */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <FaClock className="text-[#00b4d8] text-lg" />
          <div className="text-[#00b4d8] text-base font-medium font-satoshi">
            {timeAgo(parseInt(createdAt as string))}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-lg text-sm font-medium min-w-[100px] text-center ${
          status === "ACTIVE" 
            ? "bg-[#00b4d8]/10 text-[#00b4d8]" 
            : "bg-[#838587]/10 text-[#838587]"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

        {/* Amount Earned */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <FaCoins className="text-[#00b4d8] text-lg" />
          <div className="flex items-center gap-1">
            <span className="text-[#00b4d8] text-lg font-medium font-satoshi">
             { parseFloat(Number(fee / 100000000).toFixed(9)).toString()}
            </span>
            <span className="text-[#00b4d8] text-lg font-medium font-satoshi">
              SOL
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClaim(fee)}
          className="px-4 py-3 bg-[#282828] rounded-xl cursor-pointer border border-[#313131] flex items-center gap-2 hover:bg-[#313131] transition-colors"
        >
          {/* <LuCopy className="text-[#00b4d8] w-4 h-4" /> */}
          <span className="text-white text-base font-medium font-satothi">
            {claiming? "Claiming..." : "Claim"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReferralItem;
