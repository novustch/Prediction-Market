import crypto from 'crypto';

/**
 * Generates a referral code from a wallet address.
 * @param walletAddress The user's wallet address (e.g., 0xabc...123)
 * @returns A short, unique referral code
 */
export function generateReferralCodeFromWallet(walletAddress: string): string {
  const hash = crypto.createHash('sha256').update(walletAddress).digest('hex');
  
  return hash.slice(0, 8); // take first 8 characters
}