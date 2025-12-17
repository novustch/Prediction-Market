import mongoose from "mongoose";
import BN from "bn.js";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import keypair from "./prediction.json";
import { NodeWallet } from "@coral-xyz/anchor";

export const connectMongoDB = async () => {
    const MONGO_URL = process.env.DB_URL || '';
    let isConnected = false;
  
    const connect = async () => {
      try {
        if (MONGO_URL) {
          const connection = await mongoose.connect(MONGO_URL);
          console.log(`MONGODB CONNECTED : ${connection.connection.host}`);
          console.log(`----------------------------------------------------------------------------`);
          
          isConnected = true;
        } else {
          console.log("No Mongo URL");
        }
      } catch (error) {
        console.log(`Error : ${(error as Error).message}`);
        isConnected = false;
        // Attempt to reconnect
        setTimeout(connect, 1000); // Retry connection after 1 seconds
      }
    };
  
    connect();
  
    mongoose.connection.on("disconnected", () => {
      console.log("MONGODB DISCONNECTED");
      isConnected = false;
      // Attempt to reconnect
      setTimeout(connect, 1000); // Retry connection after 5 seconds
    });
  
    mongoose.connection.on("reconnected", () => {
      console.log("MONGODB RECONNECTED");
      isConnected = true;
    });
};

export const initialSettings = {
  creatorFeeAmount: 0.001 * 10 ** 9,
  marketCount: 0.1 * 10 ** 9,
  decimal: 9,
  fundFeePercentage: 1.5,
  bettingFeePercentage: 2.5
} 

export const marketField = [
  {
    name: "Coin Prediction Market",
    content: [
      {
        api_name: "Coingecho",
        needed_data: [
          {
            name: "vs_currency",
            placeholder: "usd"
          },
          {
            name: "id",
            placeholder: "solana"
          }
        ],
        task: null,
        api_link: (...args: string[]) => `https://api.coingecko.com/api/v3/simple/price?ids=${args[1]}&vs_currencies=${args[0]}`,
        market_keyword: (...args: string[]) => `id: ${args[1]}, vs_currency: ${args[0]}`,
      },
      {
        api_name: "Dexscreener",
        needed_data: [
          {
            name: "token",
            placeholder: "EGfWrQjqEexyPcZNUFGU8LypCikg34q2vqtk7hwBzWdS"
          }
        ],
        task: "$.pairs[0].priceUsd",
        api_link: (...args: string[]) => `https://api.dexscreener.com/latest/dex/tokens/${args[0]}`,
        market_keyword: (...args: string[]) => `token: ${args[0]}`,
      }
    ]
  },
]

export const backendSettings = {
  pageOffset: 10,
  expireTime: {
    initMarket: 1, // 1 Day
    pendingMarket: 7 // 7 Days
  } 
}

const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(keypair), {
  skipValidation: true,
});

export const auth = new NodeWallet(walletKeypair);

export const marketConfig = {
  range: 0,
  tokenAmount: new BN(1000000000),
  tokenPrice: new BN(0.00001 * LAMPORTS_PER_SOL),
  nameA: "AToken",
  nameB: "BToken",
  symbolA: "A",
  symbolB: "B",
  urlA: "https://tokena",
  urlB: "https://tokenb",
}