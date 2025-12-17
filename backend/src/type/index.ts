import { TransactionInstruction, Keypair, PublicKey } from "@solana/web3.js";

export type GlobalSettingType = {
    creatorFeeAmount: number;
    marketCount: number;
    decimal: number;
    fundFeePercentage: number,
    bettingFeePercentage: number
};
  
export type CreateMarketType = {
    creator: String;
    marketID: String;
    tokenAmount: number;
    tokenPrice: number;
    nameA: String;
    nameB: String;
    symbolA: String;
    symbolB: String;
    urlA: String;
    urlB: String;
    quest: number;
    date: String;
    value: number;
    range: number;
    feed: Keypair;
    oracle: TransactionInstruction;
};

export type DepositeLiquidityType = {
    creator: string,
    investor: string,
    amount: number,
}

export type BetType = {
    creator: string,
    player: string,
    amount: number,
    isYes: boolean,
    token: string
}

export type OracleType = {
    market_id: String,
    feed: String
}

export type FeedUpdateType = {
    creator: String,
    url: String,
    task: String,
    name: String,
    feed: String,
    cluster: 'Devnet' | 'Mainnet'
}

export type WithdrawType = {
    signer: PublicKey,
    market_id: PublicKey,
    amount: Number,
    reciever: PublicKey
}

export interface MarketFilter {
  volumeMin?: number;
  volumeMax?: number;
  expiryStart?: string; // ISO date
  expiryEnd?: string;
  yesProbMin?: number;
  yesProbMax?: number;
  noProbMin?: number;
  noProbMax?: number;
}

export type MarketStatus =
  "INIT" |
  "PENDING" |
  "ACTIVE" |
  "CLOSED"