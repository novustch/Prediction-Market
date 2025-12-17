use crate::constants::GLOBAL_SEED;
use crate::errors::ContractError;
use crate::states::{global::*, market::*};
use anchor_lang::{prelude::*, solana_program};
use anchor_spl::token::{Mint, TokenAccount, Token};
use crate::utils::token_transfer;
use crate::events::BettingEvent;

#[derive(Accounts)]
pub struct Betting<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        constraint = market.creator == creator.key() @ ContractError::InvalidCreator
    )]
    /// CHECK: creator is checked in constraint
    pub creator: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK reward token
    token_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        associated_token::mint = token_mint,
        associated_token::authority = market
    )]
    pub pda_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        mut, 
        associated_token::mint = token_mint,
        associated_token::authority = user.key()
    )]
    pub user_token_account: Box<Account<'info, TokenAccount>>,

    /// CHECK: global fee authority is checked in constraint
    #[account(
        mut,
        constraint = fee_authority.key() == global.fee_authority @ ContractError::InvalidFeeAuthority
    )]
    pub fee_authority: AccountInfo<'info>,

    #[account(
        mut,
        constraint = market.market_status == MarketStatus::Active @ ContractError::MarketNotActive,
    )]
    pub market: Account<'info, Market>,

    #[account(
        seeds = [GLOBAL_SEED.as_bytes()],
        bump
    )]
    pub global: Account<'info, Global>,
    pub token_program: Program<'info, Token>,
    /// CHECK: associated token program account
    pub associated_token_program: UncheckedAccount<'info>,
    /// CHECK: token metadata program account
    pub token_metadata_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl Betting<'_> {
    pub fn betting(ctx: Context<Betting>, params: BettingParams) -> Result<()> {
        let market = &mut ctx.accounts.market;

        let decimal_multiplier = 10u64.pow(ctx.accounts.global.decimal as u32);
        
        // Transfer sol to market
        let token_price = if params.is_yes {
            market.token_price_a
        } else {
            market.token_price_b
        };

        let sol_to_buy = params.amount.checked_mul(decimal_multiplier).ok_or(ContractError::ArithmeticError)?.checked_div(10u64.pow(9)).ok_or(ContractError::ArithmeticError)?.checked_mul(token_price).ok_or(ContractError::ArithmeticError)?;
        msg!("🎫sol_to_buy 🎫 {}", sol_to_buy);
        let transfer_market_instruction = solana_program::system_instruction::transfer(
            ctx.accounts.user.key,
            market.to_account_info().key,
            sol_to_buy,
        );

        anchor_lang::solana_program::program::invoke_signed(
            &transfer_market_instruction,
        &[
                ctx.accounts.user.to_account_info(),
                market.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;
            
        let mint_authority_signer: [&[u8]; 3] =
            Market::get_signer(&market.bump, &params.market_id.as_bytes());
        let mint_auth_signer_seeds = &[&mint_authority_signer[..]];

        let token_amount = params
            .amount
            .checked_mul(decimal_multiplier)
            .ok_or(ContractError::ArithmeticError)?;
        msg!("🎫token_amount to user 🎫 {}", token_amount);

        token_transfer(
            ctx.accounts.pda_token_account.to_account_info(),
            ctx.accounts.user_token_account.to_account_info(),
            market.to_account_info(),
            ctx.accounts.token_mint.to_account_info(),
            mint_auth_signer_seeds,
            token_amount,
        )?;
            
        // Transfer fee to fee authority
        
        let fee_amount_to_auth = sol_to_buy
            .checked_mul(ctx.accounts.global.betting_fee_percentage as u64)
            .ok_or(ContractError::ArithmeticError)?
            .checked_div(100)
            .ok_or(ContractError::ArithmeticError)?;

        msg!("🎫fee_amount_to_auth 🎫 {}", fee_amount_to_auth);
    
        let transfer_auth_instruction = solana_program::system_instruction::transfer(
            ctx.accounts.user.key,
            ctx.accounts.fee_authority.key,
            fee_amount_to_auth,
        );

        anchor_lang::solana_program::program::invoke_signed(
            &transfer_auth_instruction,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.fee_authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        if params.is_yes {
            market.yes_amount += 1;
        } else {
            market.no_amount += 1;
        }

        let _ = market.set_token_price(params.amount, params.is_yes)?;

        emit!(BettingEvent{
            token_a_price: market.token_price_a,
            token_b_price: market.token_price_b
        });
        Ok(())
    }
}
