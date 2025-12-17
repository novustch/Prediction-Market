use crate::constants::GLOBAL_SEED;
use crate::errors::ContractError;
use crate::events::OracleResUpdated;
use crate::states::global::Global;
use crate::states::market::Market;
use anchor_lang::prelude::*;
use switchboard_on_demand::on_demand::accounts::pull_feed::PullFeedAccountData;

#[derive(Accounts)]
pub struct GetOracleRes<'info> {
    #[account(
        mut,
        constraint = user.key() == global.admin @ ContractError::InvalidAdmin
    )]
    pub user: Signer<'info>,
    #[account(mut)]
    /// CHECK: global fee authority is checked in constraint
    pub market: Box<Account<'info, Market>>,

    #[account(
        seeds = [GLOBAL_SEED.as_bytes()],
        bump
    )]
    pub global: Box<Account<'info, Global>>,

    /// CHECK: via switchboard sdk
    pub feed: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn get_oracle_res(ctx: Context<GetOracleRes>) -> Result<()> {
    let market = &mut ctx.accounts.market;

    let feed_account = ctx.accounts.feed.data.borrow();
    let feed: std::cell::Ref<'_, PullFeedAccountData> =
        PullFeedAccountData::parse(feed_account).unwrap();

    msg!("🎫price 🎫 {:?}", feed.value());
    msg!("🎫range 🎫 {:?}", market.range);

    let feed_value: f64 = feed.value().unwrap().try_into().unwrap();

    market.result = if market.range == 0 && market.value > feed_value {
        true
    } else if market.range == 1 && market.value == feed_value {
        true
    } else if market.range == 2 && market.value < feed_value {
        true
    } else {
        false
    };

    msg!("🎫result 🎫 {:?}", ctx.accounts.market.result);

    emit!(OracleResUpdated {
        oracle_res: feed.value().unwrap().try_into().unwrap(),
    });
    Ok(())
}
