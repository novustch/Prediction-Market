import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import http from "http";
import { initialize } from "./controller";
import { connectMongoDB, initialSettings } from "./config";

dotenv.config();

connectMongoDB();

const { creatorFeeAmount, marketCount, decimal, fundFeePercentage, bettingFeePercentage } = initialSettings;
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use("/api", router);

initialize("devnet", {
  creatorFeeAmount,
  marketCount,
  decimal,
  fundFeePercentage,
  bettingFeePercentage
});

app.get("/", (req, res) => {
  res.send("💕 Welcome to Prediction market server! 💕");
});

const port = process.env.PORT || "9000";
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`------------------------------------------------------------`);
  console.log(`|                                                          |`);
  console.log(`| 🤩 Server is running on port ${port}: http://localhost:${port} |`);
  console.log(`|                                                          |`);
  console.log(`------------------------------------------------------------`);
});
