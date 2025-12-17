import { PublicKey, Connection, TransactionInstruction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddressSync, 
  createAssociatedTokenAccountInstruction 
} from "@solana/spl-token";

export const getOrCreateATAInstruction = async (
  tokenMint: PublicKey,
  owner: PublicKey,
  connection: Connection,
  payer?: PublicKey,
): Promise<[PublicKey, TransactionInstruction?]> => {
  try {
      let toAccount = getAssociatedTokenAddressSync(tokenMint, owner);

      const account = await connection.getAccountInfo(toAccount);
  
      if (!account) {
          const ix = createAssociatedTokenAccountInstruction(
          payer || owner,
          toAccount,
          owner,
          tokenMint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID,
          );
          return [toAccount, ix];
      }

      return [toAccount, undefined];
  } catch (e) {
      /* handle error */
      console.error('Error::getOrCreateATAInstruction', e);
          throw e;
      }
};

export const getAssociatedTokenAccount = async (
  ownerPubkey: PublicKey,
  mintPk: PublicKey
): Promise<PublicKey> => {
  let associatedTokenAccountPubkey = PublicKey.findProgramAddressSync(
    [
      ownerPubkey.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      mintPk.toBuffer(), // mint address
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )[0];

  return associatedTokenAccountPubkey;
};

import { Keypair } from "@solana/web3.js";
import { config } from "./config";

import { geyserClient as jitoGeyserClient } from "jito-ts";

import { SearcherClient, searcherClient as jitoSearcherClient } from "jito-ts/dist/sdk/block-engine/searcher.js";

const BLOCK_ENGINE_URLS = config.get("block_engine_urls");

const GEYSER_URL = config.get("geyser_url");
const GEYSER_ACCESS_TOKEN = config.get("geyser_access_token");

const searcherClients: SearcherClient[] = [];

for (const url of BLOCK_ENGINE_URLS) {
	const client = jitoSearcherClient(url);
	searcherClients.push(client);
}

const geyserClient = jitoGeyserClient(GEYSER_URL, GEYSER_ACCESS_TOKEN, {
	"grpc.keepalive_timeout_ms": 4000,
});

// all bundles sent get automatically forwarded to the other regions.
// assuming the first block engine in the array is the closest one
const searcherClient = searcherClients[0];

export { searcherClient, searcherClients, geyserClient };
