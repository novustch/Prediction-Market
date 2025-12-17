"use client";

import ReferralItem from "@/components/elements/referral/ReferralItem";
import { LuCopy } from "react-icons/lu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUserFriends, FaCoins } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";
import { errorAlert } from "@/components/elements/ToastGroup";
import { ReferralType } from "@/types/type";

const referrals = [
  {
    referralCode: "asdjncinj6543Dhj5C49iumxcmvbnxc97",
    timeAgo: "2m ago",
    amount: "0.08",
    status: "active" as const,
    user: "referral"
  },
  {
    referralCode: "98bhvDjk34Nmcx49UJHJdsfncA9076",
    timeAgo: "5m ago",
    amount: "0.12",
    status: "active" as const,
    user: "referral"
  },
];

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferral] = useState("");
  const [updating, setUpdating] = useState(true);
  const [referral, setReferrals] = useState<ReferralType[] | null>([]);
  const { publicKey } = useWallet();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setUpdating(true);

    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!publicKey) {
      errorAlert("Please connect wallet!");
      return
    }
    (async() =>{
      const res = await axios.post(API_ENDPOINTS.REFERRAL.GET_OR_GENERATE, {
        wallet: publicKey.toBase58(),
        referralCode: ref? ref : ""
      });
      setReferral(`http://localhost:3000/referral?ref=${res.data.code}`);
      console.log("res.data.code.referrals", res.data.referrals);
      
      setReferrals(res.data.referrals);
      setUpdating(false);
    })();
  }, [publicKey]); 

  // const totalEarnings = referrals.reduce((sum, ref) => sum + parseFloat(ref.amount), 0);
  const activeReferrals = referral?.filter(ref => ref.status === "ACTIVE").length;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-r from-[#1e1e1e] to-[#282828] rounded-xl border border-[#313131]"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaUserFriends className="text-[#00b4d8] text-xl" />
            <h3 className="text-white text-lg font-medium">Active Referrals</h3>
          </div>
          <p className="text-[#00b4d8] text-2xl font-bold">{referral?.length}</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-r from-[#1e1e1e] to-[#282828] rounded-xl border border-[#313131]"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaCoins className="text-[#00b4d8] text-xl" />
            <h3 className="text-white text-lg font-medium">Total Earnings</h3>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#00b4d8] text-2xl font-bold"></p>
            <span className="text-[#00b4d8] text-2xl font-bold">{referral?.reduce((sum, i) => sum + i.fee, 0)} SOL</span>
          </div>
        </motion.div>
      </div>

      {/* Referral Link Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-white text-2xl font-medium font-rubik">
          Your Personal Referral Link
        </h2>
        <div className="h-[60px] p-2 bg-[#1e1e1e] rounded-xl border border-[#313131] flex items-center gap-3">
          <div className="flex-1 px-6 py-3 rounded-lg">
            <div className="text-[#838587] text-xl font-medium font-satothi">
              {updating?"Updating..." : referralCode}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-4 py-3 bg-[#282828] rounded-xl cursor-pointer border border-[#313131] flex items-center gap-2 hover:bg-[#313131] transition-colors"
          >
            <LuCopy className="text-[#00b4d8] w-4 h-4" />
            <span className="text-white text-base font-medium font-satothi">
              {copied ? "Copied!" : "Copy"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Activity Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-white text-2xl font-medium font-rubik">
          Activity
        </h2>
        <div className="flex flex-col gap-4">
          {referral?.map((refer, index) => (
            <motion.div
              key={index.toString() + refer.referralCode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReferralItem {...refer} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
