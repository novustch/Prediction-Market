import { 
    CrossbarClient,
    OracleJob
  } from "@switchboard-xyz/common";
import {
    PullFeed,
    getDefaultQueue,
} from "@switchboard-xyz/on-demand";
import { Transaction, PublicKey, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { RegistType } from "../../types/type";


export const customizeFeed = async (param: RegistType) => {

    const jobs: OracleJob[] = [
        OracleJob.create({
            tasks: [
            {
                httpTask: {
                    url: param.url as string,
                }
            },
            {
                jsonParseTask: {
                    path: param.task  as string
                }
            }
            ],
        }),
    ];
    // Print the jobs that are being run.
    const jobJson = JSON.stringify({ jobs: jobs.map((job) => job.toJSON()) });
    console.log("job object:", jobJson);
    console.log();
    
    // Serialize the jobs to base64 strings.
    const serializedJobs = jobs.map((oracleJob) => {
        const encoded = OracleJob.encodeDelimited(oracleJob).finish();
        const base64 = Buffer.from(encoded).toString("base64");
        return base64;
    });
    
    // Call the simulation server.
    const response = await fetch("https://api.switchboard.xyz/api/simulate", {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({ cluster: param.cluster, jobs: serializedJobs }),
    });
    
    // Check response.
    if (response.ok) {
        const data = await response.json();
        console.log(`Response is good`);
        console.log(JSON.stringify(data, null, 2));
        if (!data.result) {
            return {result: "Invalid Resolution link or task. Please check again.", error: true};
        }
    } else {
        console.log(`Response is bad (${response.status})`);
        console.log(await response.text());
        return {result: "Invalid Resolution link or task. Please check again.", error: true};
    }

    // Get the queue for the network you're deploying on
    let queue = await getDefaultQueue("https://devnet.helius-rpc.com/?api-key=7e5bbc4c-02f5-46ca-b781-468b275b5758");

    // Get the crossbar server client
    const crossbarClient = CrossbarClient.default();
    
    // Upload jobs to Crossbar, which pins valid feeds on ipfs
    const { feedHash } = await crossbarClient.store(queue.pubkey.toBase58(), jobs);
    const [pullFeed, feedKeypair] = PullFeed.generate(queue.program);
    const initIx = await pullFeed.initIx({
        name: "BTC Price Feed", // the feed name (max 32 bytes)
        queue: queue.pubkey, // the queue of oracles to bind to
        maxVariance: 1.0, // the maximum variance allowed for the feed results
        minResponses: 1, // minimum number of responses of jobs to allow
        feedHash: Buffer.from(feedHash.slice(2), "hex"), // the feed hash
        minSampleSize: 1, // The minimum number of samples required for setting feed value
        maxStaleness: 300, // The maximum number of slots that can pass before a feed value is considered stale.
        payer: param.wallet.publicKey, // the payer of the feed
    });

    let latestBlockHash = await queue.program.provider.connection.getLatestBlockhash(
        queue.program.provider.connection.commitment
    );

    const messageV0 = new TransactionMessage({
        payerKey: param.wallet.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: [initIx],
    }).compileToV0Message();
    
    const vtx = new VersionedTransaction(messageV0);
    const sim = await queue.program.provider.connection.simulateTransaction(vtx);
    console.log("custom feed simulation:", sim);

    vtx.sign([feedKeypair]);
    const signedTx = await param.wallet.signTransaction(vtx);
    console.log("signedTx:", signedTx);
    
    if (sim.value.err) {
        console.log("Simulation error:", sim.value.err);
        throw new Error("Transaction simulation failed when creating market.");
    }
    const createV0Tx = await queue.program.provider.connection.sendTransaction(signedTx);
    console.log("tx:", createV0Tx);
    
    const vTxSig = await queue.program.provider.connection.confirmTransaction(createV0Tx, "confirmed");
    console.log("confirmation:", vTxSig);

    // const initTx = await asV0Tx({
    //     connection: queue.program.provider.connection,
    //     ixs: [initIx],
    //     payer: walletKeypair.publicKey,
    //     signers: [walletKeypair, feedKeypair],
    //     computeUnitPrice: 200_000,
    //     computeUnitLimitMultiple: 1.5,
    // });

    // // simulate the transaction
    // const simulateResult = await queue.program.provider.connection.simulateTransaction(initTx, {
    //     commitment: "processed",
    // });
    // console.log(simulateResult);

    // const initSig = await queue.program.provider.connection.sendTransaction(
    //     initTx,
    //     {
    //         preflightCommitment: "processed",
    //         skipPreflight: false,
    //     }
    // );

    // console.log(`Feed ${feedKeypair.publicKey} initialized: ${initSig}`);

    return {error: false, feedKeypair};
} 