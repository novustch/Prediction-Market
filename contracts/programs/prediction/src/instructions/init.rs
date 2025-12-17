use crate::constants::GLOBAL_SEED;
use crate::events::GlobalInitialized;
use crate::states::global::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init, 
        payer = payer, 
        space = 8 + Global::INIT_SPACE, 
        seeds = [GLOBAL_SEED.as_bytes()], 
        bump
    )]
    pub global: Account<'info, Global>,
    pub system_program: Program<'info, System>,
}

pub fn init(ctx: Context<Initialize>, params: GlobalParams) -> Result<()> {
    let global = &mut ctx.accounts.global;
    global.admin = ctx.accounts.payer.key();
    global.fee_authority = params.fee_authority;
    global.creator_fee_amount = params.creator_fee_amount;
    global.market_count = params.market_count;
    global.decimal = params.decimal;
    global.fund_fee_percentage = params.fund_fee_percentage;
    global.betting_fee_percentage = params.betting_fee_percentage;

    emit!(GlobalInitialized {
        global_id: global.key(),
        fee_recipient: global.fee_authority,
        creator_fee_amount: global.creator_fee_amount,
        market_count: global.market_count,
        decimal: global.decimal,
        fund_fee_percentage: global.fund_fee_percentage,
        betting_fee_percentage: global.betting_fee_percentage,
    });

    Ok(())
}
