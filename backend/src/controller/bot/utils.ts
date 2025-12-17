import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import { withdraw, buildVT, getOracleResult } from "../../prediction_market_sdk";
import { auth } from "../../config";
import MarketModel from "../../model/market"

export const execute = async() => {
    try {
        // Find init markets
        await expireInitData();
        // Find pending market and expire
        await expirePendingData();
        // Find finalized market, fetch result and airdropt reward
        await airdropReward();
    } catch (error) {
        console.log("😒 bot error:", error);
    }
}

const expireInitData = async() => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await MarketModel.deleteMany({
        marketStatus: 'INIT',
        createdAt: { $lt: oneDayAgo }
    });
}

const expirePendingData = async () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const penddingMarkets = await MarketModel.find({
        marketStatus: 'PENDING',
        createdAt: { $lt: oneWeekAgo },

    });

    const list: TransactionInstruction[] = [];
    for (let index = 0; index < penddingMarkets.length; index++) {
        const market = penddingMarkets[index].market;
        for (let i = 0; i < penddingMarkets[index].investors.length; i++) {
            const element = penddingMarkets[index].investors[i];
            const instructin = await withdraw({
                signer: new PublicKey(auth.payer),
                market_id: new PublicKey(market),
                amount: element.amount,
                reciever: new PublicKey(element.investor)
            });

            list.push(instructin);
        }
    }

    await buildVT(list);
}

const airdropReward = async () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const result = await MarketModel.find({
        date: { $lte: todayStr }, // Less than or equal to today
        $or: [   
            { "playerA.0": { $exists: true } },  // playerA has at least one
            { "playerB.0": { $exists: true } }   // or playerB has at least one
        ]
    });

    for (let index = 0; index < result.length; index++) {
        const market = result[index];
        
        const betting_result = await getOracleResult({
            market_id: market.market,
            feed: market.feedkey as String
        });
        
    }
}