import { useGlobalContext } from "@/providers/GlobalContext";
import { PendingData, Prediction } from "@/types/type";
import { useEffect, useState } from "react";
import { categories } from "@/data/data";
import Pagination from "../pagination/Pagination";
import PredictionCard from "./PredictionCard";
import PendingCard from "./PendingCard";
import Navbar from "../Navbar";
import axios from "axios";
import { MarketDataType } from "@/types/type";
import { usePathname } from "next/navigation";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/config/api";

// Sample data (10 items)
export const activePredictions: Prediction[] = [
  {
    category: "Trending",
    question: "Will $BTC rise +2% today?",
    volume: "$19,045",
    timeLeft: "2:47:38",
    comments: 45,
    yesPercentage: 65,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Team A win the championship?",
    volume: "$8,750",
    timeLeft: "1:15:23",
    comments: 50,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Ethereum hit $3,000 this year?",
    volume: "$22,500",
    timeLeft: "5:30:50",
    comments: 38,
    yesPercentage: 72,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will a new tech law be passed this year?",
    volume: "$12,350",
    timeLeft: "3:15:10",
    comments: 21,
    yesPercentage: 55,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will Tesla stock go up by 10%?",
    volume: "$30,120",
    timeLeft: "4:45:15",
    comments: 61,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will LeBron James retire this year?",
    volume: "$15,600",
    timeLeft: "2:12:30",
    comments: 54,
    yesPercentage: 80,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Cardano rise 30% this quarter?",
    volume: "$18,200",
    timeLeft: "3:00:20",
    comments: 45,
    yesPercentage: 67,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will climate change policies get stronger this year?",
    volume: "$25,400",
    timeLeft: "1:45:10",
    comments: 78,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will SpaceX launch a satellite?",
    volume: "$13,250",
    timeLeft: "6:30:05",
    comments: 33,
    yesPercentage: 66,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Messi break a new goal-scoring record?",
    volume: "$5,700",
    timeLeft: "7:12:30",
    comments: 25,
    yesPercentage: 50,
    imageUrl: "https://placehold.co/56x56",
  },
];

// Sample Pending Predictions
export const pendingPredictions: PendingData[] = [
  {
    category: "Crypto",
    question: "Will Ethereum hit $3,000 this year?",
    volume: "$22,500",
    timeLeft: "Pending",
    comments: 38,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will a new tech law be passed this year?",
    volume: "$12,350",
    timeLeft: "Pending",
    comments: 21,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will AI surpass human intelligence by 2030?",
    volume: "$18,750",
    timeLeft: "Pending",
    comments: 55,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Manchester United win the Champions League?",
    volume: "$15,900",
    timeLeft: "Pending",
    comments: 33,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Solana flip Ethereum in market cap?",
    volume: "$30,500",
    timeLeft: "Pending",
    comments: 62,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will the next U.S. election result in a recount?",
    volume: "$20,750",
    timeLeft: "Pending",
    comments: 41,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will the S&P 500 reach a new all-time high?",
    volume: "$25,800",
    timeLeft: "Pending",
    comments: 47,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Apple launch a foldable iPhone by 2026?",
    volume: "$14,300",
    timeLeft: "Pending",
    comments: 29,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will SpaceX successfully launch humans to Mars?",
    volume: "$50,000",
    timeLeft: "Pending",
    comments: 88,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will the next Marvel movie gross over $1 billion?",
    volume: "$19,600",
    timeLeft: "Pending",
    comments: 52,
    imageUrl: "https://placehold.co/56x56",
  },
];

interface MarketProps {
  showRecentActivity?: boolean;
  onToggleRecentActivity?: () => void;
}

const Market: React.FC<MarketProps> = ({ showRecentActivity = true, onToggleRecentActivity }) => {
  const { markets, activeTab, formatMarketData } = useGlobalContext();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("Trending");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      let marketData: AxiosResponse<any, any> = {
        data: undefined,
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new axios.AxiosHeaders()
        }
      };
      if (pathname === "/fund") {
        marketData = await axios.get(`${API_ENDPOINTS.MARKET.GET}?page=${currentPage}&limit=10&marketStatus=PENDING&marketField=${selectedCategory === "Sports" ? 1 : 0}`);
      } else if (pathname === "/") {
        marketData = await axios.get(`${API_ENDPOINTS.MARKET.GET}?page=${currentPage}&limit=10&marketStatus=ACTIVE&marketField=${selectedCategory === "Sports" ? 1 : 0}`);
      }

      setTotal(marketData.data.total);
      formatMarketData(marketData.data.data);
    })()
  }, [pathname, selectedCategory, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Filter markets based on selected category
  const filteredMarkets = markets.filter(market => {
    if (selectedCategory === "Trending") {
      return true; // Show all markets in Trending
    } else if (selectedCategory === "Sports") {
      return market.marketField === 1; // Show sports markets
    } else if (selectedCategory === "Crypto") {
      return market.marketField === 0 && market.task === "price"; // Show crypto markets
    } else if (selectedCategory === "News") {
      return market.marketField === 0 && market.task !== "price"; // Show news markets
    }
    return true;
  });

  return (
    <div className="flex-1 inline-flex flex-col self-stretch justify-start items-start gap-6">
      <Navbar 
        categories={categories} 
        onCategorySelect={handleCategorySelect} 
        showRecentActivity={showRecentActivity}
        onToggleRecentActivity={onToggleRecentActivity}
      />
      <div className={`grid w-full gap-4 ${
        pathname === "/fund" 
          ? "2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1" 
          : showRecentActivity
            ? "2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1"
            : "2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1"
      }`}>
        {filteredMarkets.map((prediction, index) =>
          activeTab === "ACTIVE" ? (
            <PredictionCard
              key={prediction._id}
              index={markets.indexOf(prediction)}
              currentPage={currentPage}
            />
          ) : (
            <PendingCard
              key={prediction._id}
              index={markets.indexOf(prediction)}
              category={prediction.feedName}
              question={prediction.question}
              volume={prediction.totalInvestment}
              timeLeft={prediction.date}
              comments={0}
              imageUrl={prediction.imageUrl}
            />
          )
        )}
      </div>

      {
        filteredMarkets.length <= 10 ? "" : <Pagination
          totalPages={Math.ceil(filteredMarkets.length / 10)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
};

export default Market;
