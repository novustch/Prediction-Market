import { TransactionInstruction, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";

export interface SidebarNavItemProps {
  label:
    | "Home"
    | "FundMarket"
    | "ProposeMarket"
    | "Referral"
    | "Profile"
    | "About";
  href: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

export interface SidebarNavProps {
  isCollapsed: boolean;
}

export interface MarketCarouselItemProps {
  category: string;
  title: string;
  bgImage: string;
  mainImage: string;
  overlayImage: string;
  volume: string;
  timeLeft: string;
  yesPercentage: number;
  comments: number;
}

// Define Prediction type for active predictions
export interface Prediction {
  category: string;
  question: string;
  volume: string;
  timeLeft: string;
  comments: number;
  yesPercentage: number; // Only for active predictions
  imageUrl: string;
  onVote?: () => void;
}

// Define PendingData type for pending predictions
export interface PendingData {
  category: string;
  question: string;
  volume: string;
  timeLeft: string;
  comments: number;
  imageUrl: string;
}

export interface ProposeType {
  marketField: number;
  imageUrl: string;
  range: number,
  apiType: number;
  question: string;
  feedName: string;
  dataLink: string;
  date: string;
  task: string;
  value: number,
  creator: string,
  description: string
}

export type GlobalSettingType = {
    creatorFeeAmount: number;
    liqudityUserFeeAmount: number;
    bettingUserFeeAmount: number;
    marketCount: number;
    decimal: number;
    feePercentage: number;
};
  
export type CreateMarketType = {
    marketID: String;
    date: String;
    value: number;
    feed: Keypair;
    wallet: WalletContextState,
    anchorWallet: AnchorWallet,
};

export type DepositeLiquidityType = {
    market_id: string,
    amount: number,
    wallet: WalletContextState,
}

export type BetType = {
    creator: string,
    player: AnchorWallet,
    marketId: string,
    amount: number,
    isYes: boolean,
    market: string,
    token: string,
}

export type OracleType = {
    creator: string,
}

export type RegistType = {
    url: String,
    task: String,
    name: String,
    wallet: AnchorWallet,
    cluster: 'Devnet' | 'Mainnet'
}

export type MarketStatus =
  "INIT" |
  "PENDING" |
  "ACTIVE" |
  "CLOSED"

export type MarketDataType = {
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

export type ReferralType = {
    wallet: String,
    referralCode: String,
    referredLevel: Number,
    fee: number,
    status: "PENDING" | "ACTIVE",
    wallet_refered: String,
    createdAt: String,
}