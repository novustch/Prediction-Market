import * as anchor from "@coral-xyz/anchor";
import { PREDICTION_ID } from "./constants";
import { IDL } from "./idl/idl";
import MarketModel from "../model/market";

let  program = new anchor.Program(IDL as anchor.Idl, PREDICTION_ID);

const OracleEvent = program.addEventListener("OracleResUpdated", (event, slot, signature) => {
    console.log("👻OracleResUpdated 👻", Number(event.oracleRes));
});

const GlobalEvent = program.addEventListener("GlobalInitialized", (event, slot, signature) => {
    console.log("👻GlobalInitilized  👻", event);
});

const MarketEvent = program.addEventListener("MarketCreated", async (event, slot, signature) => {
    console.log("👻MarketCreated  👻", event);

    const result = await MarketModel.findOneAndUpdate(
        //@ts-ignore
        { market: event.market.toString() },
        {
            marketStatus: "PENDING",
        },
        { upsert: true, new: true }
    );
    console.log("MarketEvent result:", result);
});