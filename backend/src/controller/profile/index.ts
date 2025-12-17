import { Request, Response } from "express";
import MarketModel from "../../model/market";
import ReferModel from "../../model/referral";

export const getProfileData = async (req: Request, res: Response) => {
    try {
        const { wallet } = req.query;
        
        const results = await MarketModel.find({
            $or: [
                { creator: wallet },
                { "playerA.player": wallet },
                { "playerB.player": wallet },
                { "investors.investor": wallet } 
            ]
        });

        const referrals = await ReferModel.find({
            wallet_refered: wallet
        })

        
        //// Getting Active Bet /////
        const activeBet = results.filter((val) => val.marketStatus === "ACTIVE").length;
        
        //// Getting betting history /////
        const bettingHistory = results.filter((val) => val.playerA.some(p => p.player === wallet) || val.playerB.some(p => p.player === wallet));

        //// Getting Active Bet /////
        const totalBet = bettingHistory.length;
        
        //// Getting Earning From Bet /////
        const closedMarkets = bettingHistory.filter((val) => val.marketStatus === "CLOSED");

        let earnedBet = 0;

        for (const market of closedMarkets) {
            const isPlayerAWinner = market.isYes === true;

            const winners = isPlayerAWinner ? market.playerA : market.playerB;
            const losers = isPlayerAWinner ? market.playerB : market.playerA;

            const totalWinningAmount = winners.reduce((sum, p) => sum + p.amount, 0);
            const totalLosingAmount = losers.reduce((sum, p) => sum + p.amount, 0);

            const userEntry = winners.find(p => p.player === wallet);  
            if (!userEntry) continue;

            const userShare = userEntry.amount / totalWinningAmount;
            const userEarnings = userEntry.amount + (userShare * totalLosingAmount);

            earnedBet += userEarnings;
        }

        const investList = results.filter((val) => val.investors.some(i => i.investor === wallet)); ///fundedMarkets
        let sumPerMarket: number[] = []
        if (investList.length > 0) {
            sumPerMarket = investList.map((val) => val.investors.find((val) => wallet === val.investor)!.amount);
        }
        
        //// Getting earned fee from liquidity /////
        let earnedFeeLiquidity = 0;
        for (let index = 0; index < investList.length; index++) {
            const element = investList[index];
            const userInvest = element.investors.find(p => p.investor === wallet);
            if (!userInvest) continue;
            const totalLiquidityAmount = element.investors.reduce((sum, i) => sum + i.amount, 0);
            const userShare = userInvest.amount/totalLiquidityAmount;

            const betAAmou = element.playerA.reduce((sum, i) => sum + i.amount, 0);
            const betBAmou = element.playerB.reduce((sum, i) => sum + i.amount, 0);

            const userEarnings = userInvest.amount + (userShare * (betAAmou + betBAmou) * 0.01);
            earnedFeeLiquidity += userEarnings;
        }

        //// Getting totalLiquidityProvided /////
        const totalLiquidityProvided = sumPerMarket.reduce((sum, i) => sum + i, 0);
        console.log("totalLiquidityProvided ", totalLiquidityProvided);
         
        const proposedMarket = results.filter((val) => val.creator === wallet);
        const totalProposedMarket = proposedMarket.length;
        const totalreferrals = referrals.length;
        
        res.status(200).send({ totalProfileValue: 0, activeBet, totalBet, totalLiquidityProvided, earnedFeeLiquidity, earnedBet, totalProposedMarket, totalreferrals, bettingHistory, fundedMarkets: investList, proposedMarket })
    } catch (error) {
        console.log("😒 error:", error);
        res.status(500).send("Something went wrong fetching profile Data!");
    }
}