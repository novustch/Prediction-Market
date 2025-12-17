import mongoose from "mongoose";
const MarketSchema = new mongoose.Schema({
    marketField: { type: Number, required: true },
    apiType: { type: Number, required: true },
    task: { type: String, required: true },
    creator: { type: String, required: true },
    tokenA: { type: String, default: "" },
    tokenB: { type: String, default: "" },
    initAmount: { type: Number, required: true }, 
    tradingAmountA: { type: Number, default: 0 }, 
    tradingAmountB: { type: Number, default: 0 }, 
    tokenAPrice: { type: Number, required: true }, 
    tokenBPrice: { type: Number, required: true }, 
    market: { type: String, default: "" },
    question: { type: String, required: true },
    value: { type: Number, required: true },
    range: { type: Number, required: true },
    date: { type: String, required: true },
    marketStatus: { type: String, required: true },
    feedName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    feedkey: { type: String, default: "" },
    isYes: { type: Boolean, default: false },
    feed: { type: String },
    playerA: {
        type:[ 
            {
                player: { type: String, required: true },
                amount: { type: Number, required: true }
            }
        ],
        default: []
    },
    playerB: {
        type:[ 
            {
                player: { type: String, required: true },
                amount: { type: Number, required: true }
            }
        ],
        default: []
    },
    investors: {
        type: [
            {
                investor: { type: String, required: true },
                amount: { type: Number, required: true }
            }
        ], 
        default: [] 
    },
    createdAt: { type: String, default: Date.now() }
});

const MarketModel = mongoose.model("market", MarketSchema);

export default MarketModel;