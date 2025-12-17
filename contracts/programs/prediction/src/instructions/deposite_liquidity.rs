use crate::constants::GLOBAL_SEED;
use crate::errors::ContractError;
use crate::events::MarketStatusUpdated;
use crate::states::{
    global::Global,
    market::{Market, MarketStatus},
};
use anchor_lang::{prelude::*, solana_program};

#[derive(Accounts)]
pub struct DepositLiquidity<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: global fee authority is checked in constraint
    #[account(
        mut,
        constraint = fee_authority.key() == global.fee_authority @ ContractError::InvalidFeeAuthority
    )]
    pub fee_authority: AccountInfo<'info>,

    #[account(
        mut,
        constraint = market.market_status == MarketStatus::Prepare @ ContractError::NotPreparing,
    )]
    pub market: Account<'info, Market>,

    #[account(
        seeds = [GLOBAL_SEED.as_bytes()],
        bump
    )]
    pub global: Account<'info, Global>,

    pub system_program: Program<'info, System>,
}

pub fn deposit_liquidity(ctx: Context<DepositLiquidity>, amount: u64) -> Result<()> {

    require!(amount >= 100000, ContractError::InvalidFundAmount);
    // Transfer sol to market
    let liquidity_transfer_instruction = solana_program::system_instruction::transfer(
        ctx.accounts.user.key,
        &ctx.accounts.market.key(),
        amount,
    );

    anchor_lang::solana_program::program::invoke_signed(
        &liquidity_transfer_instruction,
        &[
            ctx.accounts.user.to_account_info(),
            ctx.accounts.market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[],
    )?;

    let fee_amount_to_auth = amount
        .checked_mul(ctx.accounts.global.fund_fee_percentage as u64)
        .ok_or(ContractError::ArithmeticError)?
        .checked_div(100)
        .ok_or(ContractError::ArithmeticError)?;

    // Transfer sol to fee authority
    let transfer_instruction = solana_program::system_instruction::transfer(
        ctx.accounts.user.key,
        &ctx.accounts.fee_authority.key(),
        fee_amount_to_auth,
    );

    anchor_lang::solana_program::program::invoke_signed(
        &transfer_instruction,
        &[
            ctx.accounts.user.to_account_info(),
            ctx.accounts.fee_authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[],
    )?;

    // Update market status
    let market_balance = ctx.accounts.market.get_lamports();
    if market_balance >= ctx.accounts.global.market_count {
        ctx.accounts.market.market_status = MarketStatus::Active;
    }
    msg!("🎫deposit liquidity market_balance 🎫 {}", market_balance);
    msg!(
        "🎫deposit liquidity global.market_count 🎫 {}",
        ctx.accounts.global.market_count
    );
    msg!(
        "🎫deposit liquidity market_status 🎫 {:?}",
        ctx.accounts.market.market_status
    );
    emit!(MarketStatusUpdated {
        market_id: ctx.accounts.market.key(),
        market_status: ctx.accounts.market.market_status,
    });
    Ok(())
}
