import React, { useState } from "react";
import CommentItem from "./CommentItem";

const comments = [
  {
    username: "Ahmed45",
    timeAgo: "2h ago",
    comment: "Can I fund in this topic?",
    avatarUrl: "https://placehold.co/32x32",
  },
  {
    username: "CryptoGuru",
    timeAgo: "1h ago",
    comment: "Yes, you can! Check the details above.",
    avatarUrl: "https://placehold.co/32x32",
  },
];

const FundNavbar = () => {
  const [activeTab, setActiveTab] = useState("Comments (45)"); // Default tab is "Comments (45)"

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
      {/* Navbar */}
      <div className="self-stretch inline-flex justify-start items-center gap-4">
        {["Comments (45)", "Top Funder", "Activity"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-2xl flex justify-start items-center gap-2 cursor-pointer transition-all duration-300
            ${
              activeTab === tab
                ? "bg-[#282828] shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] text-white"
                : "outline-1 outline-offset-[-1px] outline-[#313131] text-[#838587] hover:bg-[#333] hover:text-white"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Comments (45)" && (
        <div className="self-stretch inline-flex flex-col justify-start items-center gap-4">
          {comments.map((comment, index) => (
            <CommentItem key={index} {...comment} />
          ))}
        </div>
      )}

      {activeTab === "Top Funder" && (
        <div className="self-stretch inline-flex flex-col justify-start items-center gap-4">
          {comments.map((comment, index) => (
            <CommentItem key={index} {...comment} />
          ))}
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="self-stretch inline-flex flex-col justify-start items-center gap-4">
          {comments.map((comment, index) => (
            <CommentItem key={index} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FundNavbar;
