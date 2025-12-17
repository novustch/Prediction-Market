"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MarketStatus } from "@/types/type";
// Define ActiveTab type
type MarketDataType = {
  "_id": string,
  "marketField": number,
  "apiType": number,
  "task": string,
  "creator": string,
  "tokenA": string,
  "tokenB": string,
  "market": string,
  "question": string,
  "feedName": string,
  "value": number,
  "tradingAmountA": number,
  "tradingAmountB": number,
  "tokenAPrice": number,
  "tokenBPrice": number,
  "initAmount": number,
  "range": number,
  "date": string,
  "marketStatus": string,
  "imageUrl": string,
  "createdAt": string,
  "__v": number,
  "playerACount": number,
  "playerBCount": number,
  "totalInvestment": number,
  "description": string,
  "comments": number
}

// Define Global Context Type
interface GlobalContextType {
  activeTab: MarketStatus;
  markets: MarketDataType[];
  setActiveTab: (tab: MarketStatus) => void;
  formatMarketData: (data: MarketDataType[]) => void;
}

// Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Global Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<MarketStatus>("ACTIVE");
  const [markets, setMarkets] = useState<MarketDataType[]>([]);

  const formatMarketData = (data: MarketDataType[]) => {
    setMarkets(data);
  }

  return (
    <GlobalContext.Provider value={{ activeTab, markets, setActiveTab, formatMarketData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use Global Context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
