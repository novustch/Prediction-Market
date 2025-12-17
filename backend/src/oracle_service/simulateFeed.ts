import { 
    CrossbarClient,
} from "@switchboard-xyz/common";
import {
    PullFeed,
    getDefaultQueue,
    asV0Tx,
    ON_DEMAND_DEVNET_PID
} from "@switchboard-xyz/on-demand";

import { FeedUpdateType } from "../type";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor-30";
import { auth } from "../config";

export const udpateFeed = async (param: FeedUpdateType) => {
    const sbProgram = await Program.at(ON_DEMAND_DEVNET_PID, provider);
    const feed = new PublicKey(param.feed);
    const feedAccount = new PullFeed(sbProgram, feed);
    // Get the queue for the network you're deploying on
    let queue = await getDefaultQueue("https://api.devnet.solana.com");

    // Get the crossbar server client
    const crossbarClient = CrossbarClient.default();
} 