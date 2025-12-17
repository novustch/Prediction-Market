import { global, setClusterConfig } from "../../prediction_market_sdk"
import { Cluster } from "@solana/web3.js"
import { GlobalSettingType } from "../../type";
import { execute } from "../bot/utils";

export const initialize = async (cluster: Cluster, param: GlobalSettingType ) => {
    setClusterConfig(cluster);
    await execute();
    const result = await global(param);
    if (result) {
        if (!result.new) {
            console.log("Global is already initialized.", result.globalPDA.toBase58());
        } else {
            console.log("Global is successfuly initialized.", result.globalPDA.toBase58());
        }
    } else {
        console.log("🚩Failed creating gloabal PDA.");
    }
}