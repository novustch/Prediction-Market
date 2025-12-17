import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Prediction } from "../target/types/prediction";
import { PublicKey, SystemProgram, Keypair, Transaction, Connection, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { GLOBAL_SEED, PREDICTION_ID, SOL_USDC_FEED, MARKET_SEED, TOKEN_METADATA_PROGRAM_ID, tokenAAmount, tokenBAmount, feeAuthority, METADATA_SEED, MINT_SEED_A, MINT_SEED_B } from "./const";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, getMint } from "@solana/spl-token";
import { getOrCreateATAInstruction, getAssociatedTokenAccount } from "./utils";
import BN from "bn.js";
let owner: Keypair;
let tokenA: PublicKey;
let tokenB: PublicKey;
let provider: anchor.AnchorProvider;
let market: PublicKey;
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

describe("prediction", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  owner = anchor.Wallet.local().payer;
  provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.Prediction as Program<Prediction>;
  before(async () => {
    market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), owner.publicKey.toBuffer()], PREDICTION_ID)[0];
    tokenA = PublicKey.findProgramAddressSync(
      [Buffer.from(MINT_SEED_A), market.toBuffer()],
      PREDICTION_ID
    )[0];
    tokenB = PublicKey.findProgramAddressSync(
      [Buffer.from(MINT_SEED_B), market.toBuffer()],
      PREDICTION_ID
    )[0];
    console.log("market ====>", market);
    console.log("tokenA ====>", tokenA);
    console.log("tokenB ====>", tokenB);
    
    const OracleEvent = await program.addEventListener("OracleResUpdated", (event, slot, signature) => {
      console.log("👻OracleResUpdated 👻", Number(event.oracleRes));
    });

    const GlobalEvent = await program.addEventListener("GlobalInitialized", (event, slot, signature) => {
      console.log("👻GlobalInitilized  👻", event);
    });

    const MarketEvent = await program.addEventListener("MarketCreated", (event, slot, signature) => {
      console.log("👻MarketCreated  👻", event);
    });

  });
  
  it("Is initialized!", async () => {
    const global = PublicKey.findProgramAddressSync([Buffer.from(GLOBAL_SEED)], PREDICTION_ID)[0];
    console.log("global ====>", global);

    // Add your test here.
    const tx = await program.methods.initialize({
      feeAuthority: feeAuthority,
      creatorFeeAmount: new BN(0.001 * 10 ** 9),
      liqudityUserFeeAmount: new BN(0.001 * 10 ** 9),
      bettingUserFeeAmount: new BN(0.001 * 10 ** 9),
      marketCount: new BN(0.1 * 10 ** 9),
      decimal: 9,
      feePercentage: 10,
    }).accounts({
      global,
      payer: owner.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([owner]).rpc();
    console.log("🤖Your transaction signature 🤖", tx);
    const globalAccount = await program.account.global.fetch(global);
    console.log("🎫globalAccount  🎫", globalAccount);
  });

  it("Create market", async () => {
    const global = PublicKey.findProgramAddressSync([Buffer.from(GLOBAL_SEED)], PREDICTION_ID)[0];
    console.log("global in creating market ====>", global);
    const globalAccount = await program.account.global.fetch(global);
    console.log("🎫globalAccount in creating market  🎫", globalAccount);

    let pdaTokenAAccount = await getAssociatedTokenAccount(market, tokenA);
    let pdaTokenBAccount = await getAssociatedTokenAccount(market, tokenB);
    console.log("pdaTokenAAccount ====>", pdaTokenAAccount);
    console.log("pdaTokenBAccount ====>", pdaTokenBAccount);
    const metadata_a = PublicKey.findProgramAddressSync(
      [
        Buffer.from(METADATA_SEED),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenA.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
    const metadata_b = PublicKey.findProgramAddressSync(
      [
        Buffer.from(METADATA_SEED),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenB.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
    
    // Create market //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const tx = await program.methods.initMarket({
      quest: 190,
      tokenAmount: new BN(tokenAAmount),
      tokenPrice: new BN(0.00005 * 10 ** 9),
      nameA: "tokenA",
      nameB: "tokenB",
      symbolA: "tokenA",
      symbolB: "tokenB",
      urlA: "https://tokenA.com",
      urlB: "https://tokenB.com",
    }).accounts({
      user: owner.publicKey,
      feeAuthority: feeAuthority,
      market,
      global,
      feed: new PublicKey("5mXfTYitRFsWPhdJfp2fc8N6hK8cw6NB5jAYpronQasj"),
      metadataA: metadata_a,
      metadataB: metadata_b,
      tokenMintA: tokenA,
      tokenMintB: tokenB,
      // pdaTokenAAccount,
      // pdaTokenBAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
    }).transaction();

    const mintTx = await program.methods.mintToken().accounts({
      pdaTokenAAccount,
      pdaTokenBAccount,
      user: owner.publicKey,
      feeAuthority: feeAuthority,
      market,
      global,
      metadataA: metadata_a,
      metadataB: metadata_b,
      tokenMintA: tokenA,
      tokenMintB: tokenB,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
    }).transaction();

    const creatTx = new Transaction();
    creatTx.add(tx);
    creatTx.add(mintTx);
    creatTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    creatTx.feePayer = owner.publicKey;

    const preInxSim = await connection.simulateTransaction(creatTx);
    console.log("🎫create market preInxSim 🎫", preInxSim);

    const sig = await connection.sendTransaction(creatTx, [owner], {
      skipPreflight: true,
    });

    const confirm = await connection.confirmTransaction(sig, "confirmed");
    console.log("🤖create market transaction signature 🤖", sig);
    // End of Create market //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  });

  it("Deposit liquidity", async () => {
    const global = PublicKey.findProgramAddressSync([Buffer.from(GLOBAL_SEED)], PREDICTION_ID)[0];
    console.log("global in creating market ====>", global);
    const market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), owner.publicKey.toBuffer()], PREDICTION_ID)[0];

    let tx = await program.methods.addLiquidity(new BN(0.1 * 10 ** 9))
    .accounts({
      user: owner.publicKey,
      creator: owner.publicKey,
      feeAuthority: feeAuthority,
      market,
      global,
      systemProgram: SystemProgram.programId,
    }).transaction();

    const creatTx = new Transaction();
    creatTx.add(tx);
    creatTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    creatTx.feePayer = owner.publicKey;

    const preInxSim = await connection.simulateTransaction(creatTx);
    console.log("🎫deposit liquidity preInxSim 🎫", preInxSim);

    const sig = await connection.sendTransaction(creatTx, [owner], {
      skipPreflight: true,
    });

    const confirm = await connection.confirmTransaction(sig, "confirmed");
    console.log("🤖deposit liquidity transaction signature 🤖", sig);
  });
  
  it("It is betting", async () => {
    const global = PublicKey.findProgramAddressSync([Buffer.from(GLOBAL_SEED)], PREDICTION_ID)[0];
    console.log("global in creating market ====>", global);
    const market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), owner.publicKey.toBuffer()], PREDICTION_ID)[0];
    let pdaTokenAAccount = await getAssociatedTokenAccount(market, tokenA);
    // let pdaTokenBAccount = await getAssociatedTokenAccount(market, tokenB);
    // let userTokenBAccount = getAssociatedTokenAddressSync(tokenB, owner.publicKey);

    let [userTokenAAccount, create_ata_instruction] = await getOrCreateATAInstruction(tokenA, owner.publicKey, connection );

    const tx = await program.methods.createBet({
      amount: new BN(10000),
      isYes: true,
    }).accounts({
      user: owner.publicKey,
      creator: owner.publicKey,
      tokenMint: tokenA,
      pdaTokenAccount: pdaTokenAAccount,
      userTokenAccount: userTokenAAccount,
      feeAuthority: feeAuthority,
      market,
      global,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).transaction();

    const creatTx = new Transaction();
    if (create_ata_instruction) {
      creatTx.add(create_ata_instruction);
    }
    creatTx.add(tx);
    creatTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    creatTx.feePayer = owner.publicKey;

    const preInxSim = await connection.simulateTransaction(creatTx);
    console.log("🎫create betting preInxSim 🎫", preInxSim);

    const sig = await connection.sendTransaction(creatTx, [owner], {
      skipPreflight: true,
    });

    const confirm = await connection.confirmTransaction(sig, "confirmed");
    console.log("🤖Add liquidity transaction signature 🤖", sig);
  });

  it("Get oracle res", async () => {
    const market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), owner.publicKey.toBuffer()], PREDICTION_ID)[0];

    const tx = await program.methods.getRes().accounts({
      user: owner.publicKey,
      market,
      feedAggregator: new PublicKey(SOL_USDC_FEED),
      feed: new PublicKey("5mXfTYitRFsWPhdJfp2fc8N6hK8cw6NB5jAYpronQasj"),
      systemProgram: SystemProgram.programId,
    }).signers([owner]).rpc();

    console.log("🤖Your transaction signature  🤖", tx);
  });

});
