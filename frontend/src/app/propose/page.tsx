"use client";

import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { ProposeType } from "@/types/type";
import axios from "axios";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { API_ENDPOINTS } from "@/config/api";
import { marketField } from "@/data/data";
import { elipsKey, findJsonPathsForKey, isPublickey, uploadToPinata } from "@/utils";
import { createMarket } from "@/components/prediction_market_sdk";
import { customizeFeed } from "@/components/oracle_service/simulateFeed";
import { errorAlert, infoAlert, warningAlert } from "@/components/elements/ToastGroup";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { GoQuestion } from "react-icons/go";
import Link from "next/link";

// Add TypeScript interfaces
interface SportsData {
  leagues: string[];
  teams: {
    [key: string]: string[];
  };
  stats: string[];
}

interface SportsDataType {
  [key: string]: SportsData;
}

// Add CoinGecko token list types
interface CoinGeckoToken {
  id: string;
  symbol: string;
  name: string;
}

// Add number formatting function
const formatNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
  return num.toString();
};

export default function Propose() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [active, setActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const wallet = useWallet()
  const [isChecked, setIsChecked] = useState(false);
  const [marketFieldIndex, setMarketFieldIndex] = useState(0);
  const [marketFieldContentIndex, setMarketFieldContentIndex] = useState(0);
  const [marketFieldOpen, setMarketFieldOpen] = useState(false);
  const [selectDex, setSelectDex] = useState(false);
  const [needDataError, setNeededDataError] = useState(false);
  const [marketFieldContentOpen, setMarketFieldContentOpen] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const router = useRouter()
  const anchorWallet = useAnchorWallet();

  // Add new state for sports selection
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStatType, setSelectedStatType] = useState("");
  const [sportOpen, setSportOpen] = useState(false);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [market, setMarket] = useState([]);

  // Add new state for win/lose prediction
  const [predictionOutcome, setPredictionOutcome] = useState<"win" | "lose" | "">("");

  // Sports data structure with proper typing
  const sportsData: SportsDataType = {
    basketball: {
      leagues: ["NBA"],
      teams: {
        NBA: ["Lakers", "Celtics", "Warriors", "Bulls", "Heat"]
      },
      stats: ["points", "next_game"]
    },
    football: {
      leagues: ["NFL"],
      teams: {
        NFL: ["Chiefs", "49ers", "Cowboys", "Packers", "Patriots"]
      },
      stats: ["points", "next_game"]
    },
    baseball: {
      leagues: ["MLB"],
      teams: {
        MLB: ["Yankees", "Red Sox", "Dodgers", "Cubs", "Giants"]
      },
      stats: ["points", "next_game"]
    },
    soccer: {
      leagues: ["Premier League", "La Liga", "Bundesliga", "Serie A"],
      teams: {
        "Premier League": ["Manchester United", "Liverpool", "Arsenal", "Chelsea", "Manchester City"],
        "La Liga": ["Barcelona", "Real Madrid", "Atletico Madrid", "Sevilla", "Valencia"],
        "Bundesliga": ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Wolfsburg"],
        "Serie A": ["Juventus", "Inter Milan", "AC Milan", "Roma", "Napoli"]
      },
      stats: ["points", "next_game"]
    }
  };

  const [error, setError] = useState({
    question: "",
    feedName: "",
    imageUrl: "",
    dataLink: "",
    date: "",
    value: "",
    checkbox: "",
    description: ""
  });
  const [data, setData] = useState<ProposeType>({
    // Provide default values based on the ProposeType structure
    marketField: marketFieldIndex,
    apiType: marketFieldContentIndex,
    range: 0,
    question: "",
    imageUrl: "",
    feedName: "",
    dataLink: "",
    date: "",
    task: "",
    value: 0,
    creator: "",
    description: ""
  });

  // CoinGecko token dropdown state
  const [tokenList, setTokenList] = useState<CoinGeckoToken[]>([]);
  const [tokenSearch, setTokenSearch] = useState("");
  const [dexIndex, setDexIndex] = useState(0);
  const [selectedToken, setSelectedToken] = useState<CoinGeckoToken | null>(null);
  const [tokenDropdownOpen, setTokenDropdownOpen] = useState(false);

  // Fetch token list from CoinGecko
  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await res.json();
        setTokenList(data);
      } catch (e) {
        setTokenList([]);
      }
    }
    fetchTokens();
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      setError((prevError) => ({
        ...prevError,
        imageUrl: "",
      })); // Reset error state for imageUrl

      const file = event.target.files[0];

      if (!file) {
        errorAlert("Invalid file!");
        console.log("Invalid file!");
        return
      }
      setUploading(true);
      const imageUrl = await uploadToPinata(file);

      if (!imageUrl) {
        errorAlert("Failed uploading image!");
        console.log("Invalid upload!");
        return
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
      setData((prevData) => ({
        ...prevData,
        imageUrl: imageUrl,
      }));
      infoAlert("Image uploaded successfully!");
      setUploading(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setError((prevError) => ({
      ...prevError,
      checkbox: ""
    }));
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  }

  const updateTokenTicker = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setTokenSearch(e.target.value);
    setNeededDataError(false);
    if (marketField[marketFieldIndex].content[marketFieldContentIndex].api_name === "Coingecho" ) {
      setTokenDropdownOpen(true);
    } else {
      // fetch market List 
      const isPubkey = isPublickey(e.target.value);
      console.log(isPubkey);
      
      if (isPubkey) {
        setDexIndex(0);
        const result = await axios.get(marketField[marketFieldIndex].content[marketFieldContentIndex].api_link(e.target.value));
        if (result.data.pairs.length > 0) {
          const marketList = result.data.pairs.map((val:any) => val.dexId);
          console.log("marketList:", marketList);
          setMarket(marketList);
        }
      } else {
        setMarket([]);
      }
      setTokenDropdownOpen(false);
      setData((prevData) => ({
        ...prevData,
        feedName: e.target.value,
      }));
    }
  }

  const chnageDataSource = (index: number) => {
    setMarketFieldContentIndex(index);
    setMarketFieldContentOpen(false);
    setData({
      // Provide default values based on the ProposeType structure
      marketField: marketFieldIndex,
      apiType: marketFieldContentIndex,
      range: 0,
      question: "",
      imageUrl: "",
      feedName: "",
      dataLink: "",
      date: "",
      task: "",
      value: 0,
      creator: "",
      description: ""
    });
    setTokenSearch("");
  }

  const onSubmit = async () => {
    try {
      const market_detail = marketField[marketFieldIndex].content[marketFieldContentIndex];
      const need_key = market_detail.needed_data;
      const params = [];

      if (!wallet || !wallet.publicKey || !anchorWallet) {
        warningAlert("Please connect wallet!");
        return
      }

      setActive(false);

      // Handle sports prediction data
      if (marketField[marketFieldIndex].name === "Sports Prediction Market") {
        if (!selectedSport || !selectedLeague || !selectedTeam || !selectedStatType) {
          setNeededDataError(true);
          setActive(true);
          return;
        }
        params.push(selectedSport, selectedLeague, selectedTeam, selectedStatType);
      } else {
        // Handle other market types
        const element = need_key[0];
        const elem_val = document.getElementById(element.name) as HTMLInputElement;
        if (elem_val.value === "") {
          setNeededDataError(true);
          setActive(true);
          return
        }
        if (marketField[marketFieldIndex].name === "Coingecho") {
          if (!selectedToken) {
            errorAlert("Invalid Token Ticker!");
            return
          }
          
          params.push(selectedToken.id);
        } else {
          params.push(data.feedName);
        }
        params.push(data.range);
      }

      const api_link = market_detail.api_link(...params);
      console.log("api_link:", api_link);
      
      const response = await axios.get(api_link);
      const task = market_detail.task(dexIndex, data.range) !== "null" ? market_detail.task(dexIndex, data.range) : findJsonPathsForKey(JSON.stringify(response.data), data.range?"market_cap" : "usd")[0];
      console.log("task:", task);

      data.dataLink = api_link;
      data.task = task;
      data.creator = wallet.publicKey.toBase58() || "";
      data.marketField = marketFieldIndex;
      data.apiType = marketFieldContentIndex;

      // Update question based on market type
      if (marketField[marketFieldIndex].name === "Sports Prediction Market") {
        data.question = `Will ${selectedTeam} ${selectedStatType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} reach ${data.value} by ${data.date}?`;
      } else {
        data.question = data.range? `Will ${elipsKey(data.feedName)} reach a market cap of $ ${data.value} by ${data.date}?` : `Will ${elipsKey(data.feedName)} reach a per token price of $ ${data.value} by ${data.date}?`
      }

      const res = await axios.post(API_ENDPOINTS.MARKET.CREATE, { data, isChecked });
      const market_id = res.data.result;

      const cluster = process.env.CLUSTER === "Mainnet" ? "Mainnet" : "Devnet";
      const feed_result = await customizeFeed({ url: data.dataLink, task, name: data.feedName, cluster, wallet: anchorWallet });
      console.log("feed_result:", feed_result);

      const create_result = await createMarket({
        marketID: market_id,
        date: data.date,
        value: data.value,
        feed: feed_result.feedKeypair!,
        wallet,
        anchorWallet
      });

      console.log("create result:", create_result);

      const update_res = await axios.post(API_ENDPOINTS.MARKET.ADD, { data: { ...create_result, id: market_id } });

      if (update_res.status === 200) {
        infoAlert("Market created successfully!");
        router.push(`/fund`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Error message
        console.error('Message:', error.message);

        // HTTP status code
        console.error('Status:', error.response?.status);

        // Error response data (optional)
        console.error('Error data:', error.response?.data);

        if (error.response?.status === 401) {
          setError({
            question: error.response?.data.question || "",
            feedName: error.response?.data.feedName || "",
            dataLink: error.response?.data.dataLink || "",
            imageUrl: error.response?.data.imageUrl || "",
            date: error.response?.data.date || "",
            checkbox: isChecked ? "" : "Please accept the terms and conditions",
            value: error.response?.data.value || "",
            description: error.response?.data.description || "",
          });

        } else if (error.response?.status === 500) {
          console.log("Axios Error:", error.response?.data); 
        }
      } else {
        console.error('Unexpected error:', error);
        infoAlert(JSON.stringify(error));
      }
    }

    setActive(true);
  }
  return (
    <div className="px-[50px] flex-col 2xl:flex-row self-stretch inline-flex justify-start items-start gap-[50px] overflow-auto relative">
      <div className="flex-1 p-8 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-center items-center gap-8 relative">
        {active ? "" : <div className="absolute flex justify-center items-center w-full h-full bg-[#1e1e1e]/50 backdrop-blur-sm z-20 rounded-2xl">
          <ClipLoader
            color="#ffffff"
            size={300}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>}
        
        {/* Header Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
            Create Your Prediction Market
          </div>
          <div className="justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
            Fill in the blanks to create your market!
          </div>
        </div>

        {/* Main Form Section */}
        <div className="self-stretch flex flex-col gap-8">
          {/* Top Section: Image, Category, and Data Source */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Image Upload */}
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="text-white text-xl font-semibold tracking-tight">Step 1: Add a Market Image</div>
              <div className="flex flex-col gap-2">
                <label className="w-full h-[200px] bg-[#111111] rounded-2xl cursor-pointer border-2 border-dashed border-[#313131] flex flex-col justify-center items-center gap-4 relative hover:bg-[#181a1a] transition-colors shadow-lg">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  )}
                  <FiUpload size={28} color="#07b3ff" />
                  <div className="text-[#838587] text-base font-medium text-center px-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {isUploading ? "Uploading..." : "Click to upload image"}
                  </div>
                </label>
                <div className="text-[#838587] text-xs">*File format jpg, png, img. max size 5mb</div>
                <div className={`text-red text-sm ${error.imageUrl !== "" ? "" : "invisible"}`}>*Invalid Image</div>
              </div>
            </div>

            {/* Right Column: Category and Data Source */}
            <div className="flex flex-col gap-8 lg:w-3/4">
              {/* Market Category Selection */}
              <div className="flex flex-col gap-4 relative">
                <div className="text-white text-xl font-medium">Step 2: Choose Your Market Category</div>
                <button 
                  className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                  onClick={() => setMarketFieldOpen(!marketFieldOpen)}
                >
                  {marketField[marketFieldIndex].name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {marketFieldOpen && (
                  <div id="market_catagory" className="w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] absolute left-0 bottom-[-100px] z-10 outline-[#313131]">
                    {marketField.map((field, index) => (
                      <div
                        key={"market-field-" + index }
                        className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                        onClick={() => {
                          setMarketFieldIndex(index);
                          setMarketFieldOpen(false);
                          setMarketFieldContentIndex(0);
                          // Reset sports selections when changing market type
                          if (field.name !== "Sports Prediction Market") {
                            setSelectedSport("");
                            setSelectedLeague("");
                            setSelectedTeam("");
                            setSelectedStatType("");
                          }
                        }}
                      >
                        {field.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sports Selection or API Selection */}
              {marketField[marketFieldIndex].name === "Sports Prediction Market" ? (
                <div className="space-y-4">
                  <div className="text-white text-xl font-medium">Step 3: Select Your Sport</div>
                  
                  {/* Sport Selection */}
                  <div className="relative">
                    {/* <div className="text-[#838587] text-lg mb-2">Select Sport</div> */}
                    <button 
                      className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                      onClick={() => setSportOpen(!sportOpen)}
                    >
                      {selectedSport ? selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1) : "Select a sport"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>
                    {sportOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] shadow-lg">
                        {Object.keys(sportsData).map((sport) => (
                          <div
                            key={sport}
                            className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                            onClick={() => {
                              setSelectedSport(sport);
                              setSelectedLeague("");
                              setSelectedTeam("");
                              setSelectedStatType("");
                              setSportOpen(false);
                            }}
                          >
                            {sport.charAt(0).toUpperCase() + sport.slice(1)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 relative">
                  <div className="text-white text-xl font-medium">Step 3: Select Your Data Source</div>
                  <button 
                    className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                    onClick={() => setMarketFieldContentOpen(!marketFieldContentOpen)}
                  >
                    {marketField[marketFieldIndex].content[marketFieldContentIndex].api_name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">``
                      <path stroke="currentColor" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  {marketFieldContentOpen && (
                    <div className="w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] absolute left-0 bottom-[-100px] z-10 outline-[#313131]">
                      {marketField[marketFieldIndex].content.map((field, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                          onClick={() => chnageDataSource(index)}
                        >
                          {field.api_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#313131]"></div>

          {/* Question Building Section */}
          <div className="flex flex-col gap-8">
            <div className="text-white text-xl font-medium">Step 4: Build Your Prediction Question</div>

            {/* Question Preview Card - always at the top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-4 p-8 bg-gradient-to-br from-[#181a1b] to-[#232a32] rounded-3xl border border-[#07b3ff]/30 shadow-xl relative overflow-hidden group"
            >
              {/* Rippling effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#07b3ff]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white text-2xl font-bold tracking-tight flex items-center gap-2"
              >
                <GoQuestion size={28} className="text-[#07b3ff]" />
                Your Question Preview
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-[#07b3ff] text-xl font-semibold drop-shadow-lg"
              >
                {marketField[marketFieldIndex].name === "Sports Prediction Market" ? (
                  selectedTeam ? (
                    selectedStatType === "next_game" ? (
                      predictionOutcome ? (
                        `Will ${selectedTeam} ${predictionOutcome} their next game?`
                      ) : (
                        "Please select Win or Lose"
                      )
                    ) : selectedStatType === "points" ? (
                      data.value ? (
                        `Will ${selectedTeam} score at least ${data.value} points in their next game?`
                      ) : (
                        "Please enter a target points value"
                      )
                    ) : (
                      "Please select a prediction type"
                    )
                  ) : (
                    "Please complete the team selection above"
                  )
                ) : (
                  `Will ${data.feedName ? `${elipsKey(data.feedName) }` : "___"} ${
                    data.range === 0 ? "reach a per token price of $" :
                    data.range === 1 ? "reach a market cap of $" : "___"
                  } ${
                    data.value ? formatNumber(Number(data.value)) : "___"
                  } by ${data.date || "___"}?`
                )}
              </motion.div>
            </motion.div>

            {/* Sports Details Selection (if sports market) */}
            {marketField[marketFieldIndex].name === "Sports Prediction Market" && selectedSport && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  {/* League Selection */}
                  <div className="relative">
                    <div className="text-[#838587] text-lg mb-2">Select League</div>
                    <button 
                      className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                      onClick={() => setLeagueOpen(!leagueOpen)}
                    >
                      {selectedLeague || "Select a league"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>
                    {leagueOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] shadow-lg">
                        {sportsData[selectedSport].leagues.map((league) => (
                          <div
                            key={league}
                            className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                            onClick={() => {
                              setSelectedLeague(league);
                              setSelectedTeam("");
                              setSelectedStatType("");
                              setLeagueOpen(false);
                            }}
                          >
                            {league}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Team Selection (always show, but disabled if no league) */}
                  <div className="relative">
                    <div className="text-[#838587] text-lg mb-2">Select Team</div>
                    <button 
                      className={`w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center transition-colors ${!selectedLeague ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a1a1a] cursor-pointer'}`}
                      onClick={() => selectedLeague && setTeamOpen(!teamOpen)}
                      disabled={!selectedLeague}
                    >
                      {selectedTeam || "Select a team"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>
                    {teamOpen && selectedLeague && (
                      <div className="absolute z-10 w-full mt-2 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] shadow-lg">
                        {sportsData[selectedSport].teams[selectedLeague].map((team) => (
                          <div
                            key={team}
                            className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                            onClick={() => {
                              setSelectedTeam(team);
                              setSelectedStatType("");
                              setTeamOpen(false);
                            }}
                          >
                            {team}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  {/* Stat Type Selection (always show, but disabled if no team) */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[#838587] text-lg">Prediction Type</div>
                    <div className="flex gap-4">
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                          selectedStatType === "points"
                            ? "bg-[#07b3ff] text-[#111111]"
                            : !selectedTeam ? 'opacity-50 cursor-not-allowed' : 'bg-[#111111] text-[#838587] hover:bg-[#1a1a1a] cursor-pointer'
                        }`}
                        onClick={() => selectedTeam && setSelectedStatType("points")}
                        disabled={!selectedTeam}
                      >
                        Points
                      </button>
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                          selectedStatType === "next_game"
                            ? "bg-[#07b3ff] text-[#111111]"
                            : !selectedTeam ? 'opacity-50 cursor-not-allowed' : 'bg-[#111111] text-[#838587] hover:bg-[#1a1a1a] cursor-pointer'
                        }`}
                        onClick={() => selectedTeam && setSelectedStatType("next_game")}
                        disabled={!selectedTeam}
                      >
                        Next Game
                      </button>
                    </div>
                  </div>

                  {/* Win/Lose Selection (always show, but disabled if not next_game) */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[#838587] text-lg">Prediction</div>
                    <div className="flex gap-4">
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                          predictionOutcome === "win"
                            ? "bg-[#07b3ff] text-[#111111]"
                            : selectedStatType !== "next_game" ? 'opacity-50 cursor-not-allowed' : 'bg-[#111111] text-[#838587] hover:bg-[#1a1a1a] cursor-pointer'
                        }`}
                        onClick={() => selectedStatType === "next_game" && setPredictionOutcome("win")}
                        disabled={selectedStatType !== "next_game"}
                      >
                        Win
                      </button>
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                          predictionOutcome === "lose"
                            ? "bg-[#07b3ff] text-[#111111]"
                            : selectedStatType !== "next_game" ? 'opacity-50 cursor-not-allowed' : 'bg-[#111111] text-[#838587] hover:bg-[#1a1a1a] cursor-pointer'
                        }`}
                        onClick={() => selectedStatType === "next_game" && setPredictionOutcome("lose")}
                        disabled={selectedStatType !== "next_game"}
                      >
                        Lose
                      </button>
                    </div>
                  </div>

                  {/* Target Value for points (always show, but disabled if not points) */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[#838587] text-lg">Target Points</div>
                    <input
                      type="number"
                      className={`w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors ${selectedStatType !== "points" ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Enter target points"
                      name="value"
                      onChange={onInputChange}
                      min={0}
                      disabled={selectedStatType !== "points"}
                    />
                    <div className={`text-red ${error.value !== "" ? "" : "invisible"}`}>*Invalid Prediction Value</div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Fields Grid */}
            {marketField[marketFieldIndex].name !== "Sports Prediction Market" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token Ticker - Only show for coin markets */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-[#838587] text-lg font-semibold">Token Ticker</div>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#181a1b] rounded-2xl border border-[#232a32] focus:border-[#07b3ff] outline-none transition-all"
                        placeholder={`${marketField[marketFieldIndex].content[marketFieldContentIndex].api_name === "Coingecho"? `Search for a token (e.g. BTC, ETH, etc.)`: `2bvTCZrV2wm5sDj2KENEbERzAXo3w499cVB9wDbXbonk`}`}
                        value={tokenSearch}
                        id={marketField[marketFieldIndex].content[marketFieldContentIndex].needed_data[0].name}
                        onChange={updateTokenTicker}
                        // onFocus={() => setTokenDropdownOpen(true)}
                      />
                      {tokenDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-[#181a1b] rounded-2xl border border-[#232a32] shadow-lg">
                          {tokenList
                            .filter(token =>
                              token.symbol.toLowerCase().includes(tokenSearch.toLowerCase()) ||
                              token.name.toLowerCase().includes(tokenSearch.toLowerCase())
                            )
                            .slice(0, 20)
                            .map(token => (
                              <div
                                key={token.id}
                                className="px-4 py-3 hover:bg-[#232a32] cursor-pointer text-white"
                                onClick={() => {
                                  setSelectedToken(token);
                                  setTokenSearch(token.symbol.toUpperCase());
                                  setTokenDropdownOpen(false);
                                  setData(prev => ({ ...prev, feedName: token.symbol.toUpperCase() }));
                                }}
                              >
                                <span className="font-bold">{token.symbol.toUpperCase()}</span> <span className="text-[#838587]">{token.name}</span>
                              </div>
                            ))}
                          {tokenList.filter(token =>
                            token.symbol.toLowerCase().includes(tokenSearch.toLowerCase()) ||
                            token.name.toLowerCase().includes(tokenSearch.toLowerCase())
                          ).length === 0 && (
                            <div className="px-4 py-3 text-[#838587]">No tokens found</div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={`text-red ${needDataError ? "" : "invisible"}`}>*Please enter a token ticker</div>
                  </div>
                  {/* Token Verification Link and ID */}
                  {selectedToken && (
                    <div className="flex flex-col gap-1 mt-2">
                      <Link
                        href={`https://www.coingecko.com/en/coins/${selectedToken.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#07b3ff] underline text-base font-medium hover:text-[#3fd145] transition-colors float-left"
                      >
                        View on CoinGecko
                      </Link>
                      <div className="text-[#838587] text-xs">CoinGecko ID: <span className="font-mono">{selectedToken.id}</span></div>
                    </div>
                  )}
                  {market.length > 0 &&
                    ( 
                      <div className="flex flex-col gap-4 relative">
                        <div className="text-white text-xl font-medium">Choose DEX platform</div>
                        <button 
                          className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#181a1b] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                          onClick={() => setSelectDex(!selectDex)}
                        >
                          {market[dexIndex]}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" d="m1 1 4 4 4-4" />
                          </svg>
                        </button>
                        {selectDex && (
                          <div id="market_catagory" className="w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] absolute left-0 bottom-[-100px] z-10 outline-[#313131]">
                            {market.map((dex, index) => (
                              <div
                                key={"market-field-" + index }
                                className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors text-white"
                                onClick={() => {
                                  setSelectDex(false);
                                  setDexIndex(index);
                                }}
                              >
                                {dex}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                    )
                  }
                </div>
                <div>

                </div>
                {/* Target Value & Resolution Date side by side */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="text-[#838587] text-lg font-semibold">Target Value</div>
                      <input
                        type="number"
                        className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#181a1b] rounded-2xl border border-[#232a32] focus:border-[#07b3ff] outline-none transition-all"
                        placeholder="Enter target value"
                        name="value"
                        onChange={onInputChange}
                        value={data.value}
                        min={0}
                      />
                      <div className={`text-red ${error.value !== "" ? "" : "invisible"}`}>*Invalid Prediction Value</div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="text-[#838587] text-lg font-semibold">Resolution Date</div>
                      <input
                        type="date"
                        className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#181a1b] rounded-2xl border border-[#232a32] focus:border-[#07b3ff] outline-none transition-all"
                        name="date"
                        onChange={onInputChange}
                      />
                      <div className={`text-red ${error.date !== "" ? "" : "invisible"}`}>*Invalid Resolution Date</div>
                    </div>
                  </div>
                  {/* Prediction Type Selection - Only show for coin markets */}
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-[#838587] text-lg font-semibold">Prediction Type</div>
                    <div className="flex gap-4">
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-semibold rounded-2xl border border-[#232a32] transition-colors ${
                          data.range === 0
                            ? "bg-[#07b3ff] text-[#181a1b] border-[#07b3ff] shadow"
                            : "bg-[#181a1b] text-[#838587] hover:bg-[#232a32]"
                        }`}
                        onClick={() => setData(prev => ({ ...prev, range: 0 }))}
                      >
                        Price Target
                      </button> 
                      <button
                        className={`flex-1 px-4 py-3.5 text-lg font-semibold rounded-2xl border border-[#232a32] transition-colors ${
                          data.range === 1
                            ? "bg-[#07b3ff] text-[#181a1b] border-[#07b3ff] shadow"
                            : "bg-[#181a1b] text-[#838587] hover:bg-[#232a32]"
                        }`}
                        onClick={() => setData(prev => ({ ...prev, range: 1 }))}
                      >
                        Market Cap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description - Full width below the grid */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="text-[#838587] text-lg font-semibold">Description</div>
              <textarea
                rows={6}
                className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#181a1b] rounded-2xl border border-[#232a32] focus:border-[#07b3ff] outline-none transition-all resize-none"
                placeholder="Describe your prediction market..."
                name="description"
                onChange={onInputChange}
              />
              <div className={`text-red ${error.description !== "" ? "" : "invisible"}`}>*Please fill out this field</div>
            </div>

            {/* Terms and Submit Section */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  onClick={handleCheckboxChange}
                />
                <div className="text-[#838587] text-lg">
                  I agree to the{" "}
                  <span className="text-[#3fd145] underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </div>
              </div>
              <div className={`text-red ${error.checkbox !== "" ? "" : "invisible"}`}>
                *Please accept the terms and conditions
              </div>

              {/* Submit Button */}
              <button
                className="w-full px-6 py-4 text-xl font-medium text-[#111111] bg-[#07b3ff] rounded-2xl shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] hover:bg-[#0697e5] transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={onSubmit}
              >
                Create Market
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
