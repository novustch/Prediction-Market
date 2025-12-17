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