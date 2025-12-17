import { Request, Response } from "express";
import ReferModel from "../../model/referral";
import { generateReferralCodeFromWallet } from "./utils";
import { claimFee } from "../../prediction_market_sdk";

export const getReferCode = async (req: Request, res: Response) => {
    try {
        const { wallet, referralCode } = req.body;
        
        let referredLevel = 0;
        const info = await ReferModel.findOne({
            wallet
        });
        
        let code = "";
    
        if (!info) {
            let wallet_refered = "";
            code = generateReferralCodeFromWallet(wallet as string);

            if (referralCode !== "") {
                const result = await ReferModel.findOneAndUpdate(
                    {
                        referralCode
                    },
                    {
                        $push: {
                            ids: wallet
                        }
                    }
                );
        
                if (result) {
                    referredLevel = result?.referredLevel + 1;
                    wallet_refered = result.wallet;
                } else {
                    res.status(500).send({ error: "Invalid Referral code!" });
                }
            }
    
            const data = new ReferModel({
                wallet,
                referralCode: code,
                wallet_refered,
                referredLevel 
            })
    
            await data.save();
        } else {
            code = info.referralCode;
        }

        const referrals = await ReferModel.find({
            wallet_refered: wallet
        });
        
        res.status(200).send({ code, referrals });
    } catch (error) {
        console.log("😒 error:", error);
        res.status(500).send("Something went wrong referral code generation!");
    }
}

export const claimReward = async(req: Request, res: Response) => {
    try {
        const { wallet, amount } = req.body;
        await claimFee(wallet, amount);
        const info = await ReferModel.findOneAndUpdate(
            {
                wallet
            },
            {
               fee: 0 
            }
        );
        res.status(200).send("success");
    } catch (error) {
        console.log(error);
        res.status(500).send("failed claim");
    }
}