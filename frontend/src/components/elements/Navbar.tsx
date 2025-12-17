import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icons";
import { IconName } from "./Icons/Icons";
import SearchInputItem from "./marketInfo/SearchInputItem";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const searchInputs = [
  { title: "Volume", minPlaceholder: "Min", maxPlaceholder: "Max" },
  { title: "Expiry Time", minPlaceholder: "Start", maxPlaceholder: "End" },
  { title: "Yes Probability", minPlaceholder: "Min", maxPlaceholder: "Max" },
  { title: "No Probability", minPlaceholder: "Min", maxPlaceholder: "Max" },
];

type Category = {
  name: string;
  active: boolean;
  icon: IconName;
  color: string;
};

type NavbarProps = {
  categories: Category[];
  onCategorySelect: (category: string) => void;
  showRecentActivity?: boolean;
  onToggleRecentActivity?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ 
  categories, 
  onCategorySelect, 
  showRecentActivity = true,
  onToggleRecentActivity 
}) => {
  // Keep track of the selected category using state
  const [activeCategory, setActiveCategory] = useState<string>("Trending");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const searchPadRef = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  const handleFilterClick = () => {
    setShowFilter((prevState) => !prevState);
  };

  // Close the search input pad if clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(e.target as Node) &&
      searchPadRef.current &&
      !searchPadRef.current.contains(e.target as Node)
    ) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-[#1a1a1a] relative">
      <div className="flex items-center lg:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelect(category.name)}
            className={`sm:px-5 px-3 pb-3 border-b-[1.5px] inline-flex cursor-pointer justify-start items-center gap-1 transition-all duration-300 ease-in-out relative group ${activeCategory === category.name ? "border-[#07b3ff] text-[#07b3ff]" : "border-transparent text-[#838587] hover:text-[#07b3ff]/80"}`}
          >
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#07b3ff] transition-all duration-300 ease-in-out group-hover:w-full" />

            <div className="w-5 h-5 relative overflow-hidden">
              <Icon
                name={category.icon}
                color={activeCategory === category.name ? "#07b3ff" : "#838587"}
                className={`transition-all duration-300 ease-in-out hover:text-[#07b3ff]`}
              />
            </div>
            <div className={`justify-start md:text-xl text-base font-medium leading-7 ${activeCategory === category.name ? "" : "hidden md:flex"}`}>
              {category.name}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">

        <div
          data-active={showFilter ? "On" : "Off"}
          ref={filterRef}
          className="sm:px-4 sm:py-2.5 px-2.5 py-1 bg-[#282828] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#343434] hover:shadow-md active:scale-95 active:bg-[#3c3c3c]"
          onClick={handleFilterClick}
        >
          <div className="w-4 h-4 relative overflow-hidden">
            <Icon name="Filter" color="white" />
          </div>
          <div className="justify-start hidden lg:flex text-white text-base font-medium font-satoshi leading-normal group-hover:text-[#07b3ff] transition-all duration-300">
            Filter
          </div>
        </div>
        <button
          onClick={onToggleRecentActivity}
          className="sm:px-4 sm:py-2.5 px-2.5 py-1 bg-[#282828] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#343434] hover:shadow-md active:scale-95 active:bg-[#3c3c3c]"
        >
          {showRecentActivity ? (
            <IoEyeOffOutline className="text-white text-xl" />
          ) : (
            <IoEyeOutline className="text-white text-xl" />
          )}
        </button>
      </div>

      {showFilter && (
        <div
          ref={searchPadRef}
          className="z-1 p-5 right-[0px] top-[70px] absolute bg-[#1e1e1e] rounded-[20px] shadow-[0px_12px_24px_0px_rgba(5,8,17,1.00)] outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-center gap-4"
        >
          {searchInputs.map((input, index) => (
            <SearchInputItem
              key={index}
              title={input.title}
              minPlaceholder={input.minPlaceholder}
              maxPlaceholder={input.maxPlaceholder}
            />
          ))}
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div
              className="flex-1 px-4 cursor-pointer py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] outline-[#838587] flex justify-center items-center gap-1 transition-all duration-300 hover:bg-[#383838] hover:text-white hover:shadow-md active:scale-95"
            >
              <div
                className="justify-center text-[#838587] text-sm font-medium font-satoshi leading-[14px] transition-all duration-300 group-hover:text-white"
              >
                Reset
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;