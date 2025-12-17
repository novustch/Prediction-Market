import mongoose from "mongoose";

const Referral = new mongoose.Schema({
    wallet: { type: String, required: true },
    referralCode: { type: String, required: true },
    status: { type: String, default: "PENDING" },
    fee: { type: Number, default: 0 },
    referredLevel: { type: Number, required: true },
    wallet_refered: { type: String, default: "" },
    createdAt: { type: String, default: Date.now() },
});

const ReferModel = mongoose.model("refferal", Referral);

export default ReferModel;