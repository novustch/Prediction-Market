import { Request, Response } from "express"
import MarketModel from "../../model/market";
import { marketConfig } from "../../config";
import ReferModel from "../../model/referral";
import { buildMarketFilterQuery } from "./utils";

export const create_market = async (req: Request, res: Response) => {
    try {
        const { 
            marketField,
            apiType,
            question,
            task,
            date,
            value,
            range,
            imageUrl,
            creator,
            feedName,
            description,
        } = req.body.data;

        const marketData = new MarketModel({
            marketField,
            apiType,
            task,
            creator,
            question,
            value,
            range,
            date,
            marketStatus: "INIT",
            imageUrl,
            feedName,
            description,
            tokenAPrice: marketConfig.tokenPrice,
            tokenBPrice: marketConfig.tokenPrice,
            initAmount: marketConfig.tokenAmount
        });

        const db_result = await marketData.save();
        console.log("Created init market data on db:", db_result.id.toString());
        
        res.status(200).json({ message: "Feed registration successful!" , result: db_result.id });
    } catch (error) {
        console.log("😒 create market error:", error);
        res.status(500).send("Failed to create market! Please try again later.");
        return
    }
}

// export const add_liquidity = async (req: Request, res: Response) => {
//     try {
//         const { investor, amount, market_id } = req.body;

//         const result = await MarketModel.findByIdAndUpdate(
//             market_id,
//             { $push: { investors: { investor, amount } } },
//             { new: true }
//         )
//         console.log("new update add liquidity:", result);

//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json("Something went wrong add liquidity.");
//         console.log("😒 add liquidity error:", error);
//     }
// }

export const betting = async (req: Request, res: Response) => {
    try {
        const { player, market_id, amount, isYes, token_a_amount, token_b_amount, token_a_price, token_b_price } = req.body;
        console.log(player, market_id, amount, isYes);
        
        let sol_amount = isYes? token_a_price * amount : token_b_price * amount;
        const result = await MarketModel.findByIdAndUpdate(
            market_id,
            {
                $set: {
                    tradingAmountA: token_a_amount,
                    tradingAmountB: token_b_amount,
                    tokenAPrice: token_a_price,
                    tokenBPrice: token_b_price
                },
                $push: isYes? { playerA: { player, amount: sol_amount }}: { playerB: { player, amount: sol_amount } },
            },
            { new: true }
        )

        console.log("sol_amount:", sol_amount);
        setReferralFee(player, sol_amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Failed betting!");
        console.log("😒 betting error:", error);
        return
    }
}

export const additionalInfo = async (req:Request, res: Response) => {
    try {
        const { id, market, tokenA, tokenB, feedAddress } = req.body.data;
        
        const result = await MarketModel.updateOne(
            {
                _id: id
            },
            {
                $set: { market: market, tokenA: tokenA, tokenB: tokenB, marketStatus: "PENDING", feedkey: feedAddress },
            }
        );
        res.status(200).json({result: "success"});
    } catch (error) {
        console.log("😒 add info error:", error);
        res.status(500).send("Failed to update info! Please try again later.");
        return
    }
}

export const getMarketData = async (req:Request, res: Response) => {
    try {
        const { marketStatus, page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
        const match: any = {};
        if (marketStatus) {
          match.marketStatus = marketStatus;
        }
    
        const results = await MarketModel.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit as string) },
            {
                $addFields: {
                    playerACount: { $sum: "$playerA.amount" },
                    playerBCount: { $sum: "$playerB.amount" },
                    totalInvestment: { $sum: "$investors.amount" }
                }
            },
            {
                $project: {
                    playerA: 0,
                    playerB: 0,
                    investors: 0
                }
            }
        ]);
    
        const total = await MarketModel.countDocuments(match);
        
        res.json({
            data: results,
            total,
            page: +page,
            totalPages: Math.ceil(total / +limit),
        });
    } catch (err) {
        console.log("😒 get market data error:", err);
        res.status(500).json({ error: 'Server error' });
    }
}

export const addLiquidity = async (req:Request, res: Response) => {
    try {
        const { market_id, amount, investor, active } = req.body;
        console.log("status:", active);
        
        const liquidity_result = await MarketModel.findOneAndUpdate(
            {
                _id: market_id
            },
            {
                $set: {
                    marketStatus: active ? "ACTIVE" : "PENDING"
                },
                $push: {
                    investors: {
                        investor,
                        amount,
                    },
                },
            }
        )

        setReferralFee(investor, amount)

        res.status(200).json({result: "success"});
    } catch (error) {
        console.log("😒 error:", error);
        res.status(500).send("Failed to add liquidity! Please try again later.");
        return
    }
}

export const setReferralFee = async (wallet: string, amount: number) => {
    try {
        const refer = await ReferModel.findOne({
            wallet
        });

        if (refer) {
            let fee = 0;
            if (refer.wallet_refered !== "") {
                switch (refer.referredLevel) {
                    case 0:
                        fee = refer.fee + amount * 0.005 * 0.7 
                        break
                    case 1:
                        fee = refer.fee + amount * 0.005 * 0.2 
                        break
                    case 1:
                        fee = refer.fee + amount * 0.005 * 0.1 
                        break
                    default:
                        fee = 0;
                        break
                }
            }

            refer.fee = fee;
            refer.save();
        }
    } catch (error) {
        console.log("set referral fee error:", error);
    }
}

export const getFilteredMarket = async (req:Request, res: Response) => {
    try {
        const {
            volumeMin,
            volumeMax,
            expiryStart, // ISO date
            expiryEnd,
            yesProbMin,
            yesProbMax,
            noProbMin,
            noProbMax,
        } = req.body

        const query = buildMarketFilterQuery({
            volumeMin,
            volumeMax,
            expiryStart, // ISO date
            expiryEnd,
            yesProbMin,
            yesProbMax,
            noProbMin,
            noProbMax,
        })

        const result = await MarketModel.find(query)

        res.status(200).send({data: result});
    } catch (error) {
        console.log("😒 error:", error);
        return res.status(500).send("Failed to filter market! Please try again later.");
    }
}

export const recentActivity = async (req:Request, res: Response) => {}