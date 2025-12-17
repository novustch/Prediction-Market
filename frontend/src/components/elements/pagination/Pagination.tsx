"use client";

import React from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

interface PaginationProps {
  totalPages: number; // Total number of pages
  currentPage: number; // The current active page
  onPageChange: (page: number) => void; // Function to handle page change
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Generate an array of page numbers to display
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Handle page click
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="self-stretch inline-flex justify-center items-center gap-4">
      <div className="rounded-[18px] flex justify-start items-center sm:gap-6 gap-3">
        {/* Left Decoration */}
        <div className="sm:p-4 p-2 bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] shadow-[inset_0px_-2px_0px_0px_rgba(27,27,27,1.00)] flex justify-start items-center gap-2">
          <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center ">
            <MdOutlineKeyboardArrowLeft className="text-white text-lg flex justify-center items-center" />
          </div>
        </div>

        {/* Pagination Items */}
        <div className="flex justify-start items-center gap-2">
          {pageNumbers.map((page) => (
            <div
              key={page}
              data-active={currentPage === page ? "On" : "Off"}
              onClick={() => handlePageClick(page)}
              className={`sm:w-14 w-10 sm:p-4 p-2 rounded-2xl outline-1 outline-offset-[-1px] ${
                currentPage === page
                  ? "bg-white/10 outline-[#838587]"
                  : "opacity outline-[#282828]"
              } flex justify-center items-center gap-2 cursor-pointer`}
            >
              <div className="text-white">{page}</div>
            </div>
          ))}
        </div>

        {/* Right Decoration */}
        <div className="sm:p-4 p-2 bg-[#282828] rounded-2xl shadow-[inset_0px_2px_0px_0px_rgba(53,53,53,1.00)] shadow-[inset_0px_-2px_0px_0px_rgba(27,27,27,1.00)] flex justify-start items-center gap-2">
          <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
            <MdKeyboardArrowRight className="text-white flex justify-center items-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
