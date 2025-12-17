use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace, Debug)]
pub struct Global {
    pub admin: Pubkey,
    pub fee_authority: Pubkey,
    pub creator_fee_amount: u64,
    pub decimal: u8,
    pub market_count: u64,
    pub betting_fee_percentage: f64,
    pub fund_fee_percentage: f64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct GlobalParams {
    pub fee_authority: Pubkey,
    pub creator_fee_amount: u64,
    pub market_count: u64,
    pub decimal: u8,
    pub betting_fee_percentage: f64,
    pub fund_fee_percentage: f64,
}
