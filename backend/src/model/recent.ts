import mongoose from "mongoose";

const Recent = new mongoose.Schema({
    marketId: { type: String, required: true },
    isFund: { type: Boolean, default: false },
    buyYes: { type: Boolean, default: false },
    buyNo: { type: Boolean, default: false },
    sellYes: { type: Boolean, default: false },
    sellNo: { type: Boolean, default: false },
    fundAmount: {type: Number, default: 0},
    createdAt: { type: String, default: Date.now() },
});

const RecentModel = mongoose.model("recent", Recent); 

export default RecentModel;