use crate::constants::{GLOBAL_SEED, MARKET_SEED, MINT_SEED_A, MINT_SEED_B};
use crate::errors::ContractError;
use crate::events::MarketCreated;
use crate::states::{global::*, market::*};
use anchor_lang::{prelude::*, solana_program};
use anchor_spl::{
    metadata::{
        create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMetadataAccountsV3,
    },
    token::{Mint, Token},
};

#[derive(Accounts)]
#[instruction(params: MarketParams)]
pub struct CreateMarket<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: global fee authority is checked in constraint
    #[account(
        mut,
        constraint = fee_authority.key() == global_pda.fee_authority @ ContractError::InvalidFeeAuthority
    )]
    pub fee_authority: AccountInfo<'info>,

    #[account(
        init,
        payer = user,
        space = 8 + Market::INIT_SPACE,
        seeds = [MARKET_SEED.as_bytes(), &params.market_id.as_bytes()],
        bump
    )]
    /// CHECK: global fee authority is checked in constraint
    pub market: Box<Account<'info, Market>>,
    #[account(
        seeds = [GLOBAL_SEED.as_bytes()],
        bump
    )]
    pub global_pda: Box<Account<'info, Global>>,
    /// CHECK: via switchboard sdk
    pub feed: AccountInfo<'info>,

    ///CHECK: Using seed to validate metadata account
    #[account(mut)]
    metadata_a: UncheckedAccount<'info>,

    ///CHECK: Using seed to validate metadata account
    #[account(mut)]
    metadata_b: UncheckedAccount<'info>,

    #[account(
        init,
        seeds = [MINT_SEED_A.as_bytes(), market.key().as_ref()],
        bump,
        payer = user,
        mint::decimals = global_pda.decimal,
        mint::authority = market,
    )]
    token_mint_a: Box<Account<'info, Mint>>,
    #[account(
        init,
        seeds = [MINT_SEED_B.as_bytes(), market.key().as_ref()],
        bump,
        payer = user,
        mint::decimals = global_pda.decimal,
        mint::authority = market
    )]
    token_mint_b: Box<Account<'info, Mint>>,

    pub token_program: Program<'info, Token>,
    /// CHECK: associated token program account
    pub associated_token_program: UncheckedAccount<'info>,
    /// CHECK: token metadata program account
    pub token_metadata_program: UncheckedAccount<'info>,
    /// CHECK: rent account
    pub rent: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl CreateMarket<'_> {
    pub fn create_market(ctx: Context<CreateMarket>, params: MarketParams) -> Result<()> {
        // update market settings
        let _ = ctx.accounts.market.update_market_settings(
            params.value,
            params.range,
            ctx.accounts.user.key(),
            ctx.accounts.feed.key(),
            ctx.accounts.token_mint_a.key(),
            ctx.accounts.token_mint_b.key(),
            params.token_amount,
            params.token_price,
            params.date,
        );

        let mint_authority_signer: [&[u8]; 3] =
            Market::get_signer(&ctx.bumps.market, &params.market_id.as_bytes());
        let mint_auth_signer_seeds = &[&mint_authority_signer[..]];
        ctx.accounts.market.bump = ctx.bumps.market;
        msg!("🎫here metadata creation 🎫");
        // initialize Yes token metadata
        ctx.accounts.intialize_meta(
            params.name_a,
            true,
            params.symbol_a,
            params.url_a,
            mint_auth_signer_seeds,
        )?;
        msg!("🎫here metadata creation 2 🎫");

        // initialize No token metadata
        ctx.accounts.intialize_meta(
            params.name_b,
            false,
            params.symbol_b,
            params.url_b,
            mint_auth_signer_seeds,
        )?;

        // Transfer creator fee to fee authority
        let transfer_instruction = solana_program::system_instruction::transfer(
            ctx.accounts.user.key,
            ctx.accounts.fee_authority.key,
            ctx.accounts.global_pda.creator_fee_amount,
        );

        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.fee_authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        emit!(MarketCreated {
            market_id: ctx.accounts.market.key(),
            value: ctx.accounts.market.value,
            range: ctx.accounts.market.range,
            creator: ctx.accounts.user.key(),
            feed: ctx.accounts.feed.key(),
            token_a: ctx.accounts.token_mint_a.key(),
            token_b: ctx.accounts.token_mint_b.key(),
            market_status: ctx.accounts.market.market_status,
            token_a_amount: ctx.accounts.market.token_a_amount,
            token_b_amount: ctx.accounts.market.token_b_amount,
            token_price_a: ctx.accounts.market.token_price_a,
            token_price_b: ctx.accounts.market.token_price_b,
            total_reserve: ctx.accounts.market.total_reserve,
        });

        Ok(())
    }
    pub fn intialize_meta(
        &mut self,
        name: Option<String>,
        is_token_a: bool,
        symbol: Option<String>,
        uri: Option<String>,
        mint_auth_signer_seeds: &[&[&[u8]]; 1],
    ) -> Result<()> {
        let mint_info: AccountInfo<'_>;
        if is_token_a {
            mint_info = self.token_mint_a.to_account_info();
        } else {
            mint_info = self.token_mint_b.to_account_info();
        }

        let mint_authority_info = self.market.to_account_info();
        let metadata_info = if is_token_a {
            self.metadata_a.to_account_info()
        } else {
            self.metadata_b.to_account_info()
        };

        let mut para_name: String = "".to_string();
        let mut para_symbol: String = "".to_string();
        let mut para_uri: String = "".to_string();

        if let Some(name) = name {
            para_name = name.to_string();
        }
        if let Some(symbol) = symbol {
            para_symbol = symbol.to_string();
        }
        if let Some(uri) = uri {
            para_uri = uri.to_string();
        }

        let token_data: DataV2 = DataV2 {
            name: para_name.clone(),
            symbol: para_symbol.clone(),
            uri: para_uri.clone(),
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };
        let metadata_ctx = CpiContext::new_with_signer(
            self.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                payer: self.user.to_account_info(),
                mint: mint_info.clone(),
                metadata: metadata_info.clone(),
                update_authority: mint_authority_info.clone(),
                mint_authority: mint_authority_info.clone(),
                system_program: self.system_program.to_account_info(),
                rent: self.rent.to_account_info(),
            },
            mint_auth_signer_seeds,
        );
        create_metadata_accounts_v3(metadata_ctx, token_data, false, true, None)?;
        msg!("CollectionToken::intialize_meta: done");
        Ok(())
    }
}
