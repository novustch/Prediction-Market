use crate::states::market::MarketStatus;
use anchor_lang::prelude::*;
#[event]
pub struct GlobalInitialized {
    pub global_id: Pubkey,
    pub fee_recipient: Pubkey,
    pub creator_fee_amount: u64,
    pub market_count: u64,
    pub decimal: u8,
    pub fund_fee_percentage: f64,
    pub betting_fee_percentage: f64,
}

#[event]
pub struct OracleResUpdated {
    pub oracle_res: f64,
}

#[event]
pub struct MarketCreated {
    pub market_id: Pubkey,
    pub value: f64,
    pub range: u8,
    pub creator: Pubkey,
    pub feed: Pubkey,
    pub token_a: Pubkey,
    pub token_b: Pubkey,
    pub market_status: MarketStatus,
    pub token_a_amount: u64,
    pub token_b_amount: u64,
    pub token_price_a: u64,
    pub token_price_b: u64,
    pub total_reserve: u64,
}

#[event]
pub struct MarketStatusUpdated {
    pub market_id: Pubkey,
    pub market_status: MarketStatus,
}

#[event]
pub struct BettingEvent {
    pub token_a_price: u64,
    pub token_b_price: u64,
}
