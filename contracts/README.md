## 🔹 Overview
This is a **Solana-based Prediction Market Smart Contract** built using the **Anchor framework**. It enables users to predict outcomes of real-world events by trading "Yes" and "No" tokens.

---

## 🚀 Features
✅ **Decentralized Prediction Market** – Users can create their own market.

✅ **Deposite liquidity** – Users can deposite sol before start betting and once the liqudity amount reaches special amount they can start betting "Yes" and "No".

✅ **Betting** – Trade "Yes" and "No" tokens based on expected outcomes. Users can purchase "Yes" or "No" tokens based on their predictions, with token prices fluctuating dynamically according to probability. This probability is determined by the total number of tokens sold to users, ensuring a market-driven pricing mechanism.

✅ **Automated Settlement** – Resolves markets based on real-world data  

✅ **Switchboard Oracle Integration** – Fetches external data for outcome validation  

---

## 📜 Smart Contract Architecture
### 1️⃣ Initial preparation
```typescript
const tx = await program.methods.initialize({
      feeAuthority: feeAuthority,
      creatorFeeAmount: new BN(0.001 * 10 ** 9),
      liqudityUserFeeAmount: new BN(0.001 * 10 ** 9),
      bettingUserFeeAmount: new BN(0.001 * 10 ** 9),
      marketCount: new BN(0.1 * 10 ** 9),
      decimal: 9,
      feePercentage: 10,
}).accounts({
      global,
      payer: owner.publicKey,
      systemProgram: SystemProgram.programId,
}).signers([owner]).rpc();
```
```rust
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
```
### 2️⃣ Market creation
- Create Market PDA
- Setup initial options for "Yes" and "No" token and prodiction quest
- Mint new token for "Yes" and "No" token

```typescript
const tx = await program.methods.initMarket({
      quest: 190,
      tokenAmount: new BN(tokenAAmount),
      tokenPrice: new BN(0.00005 * 10 ** 9),
      nameA: "tokenA",
      nameB: "tokenB",
      symbolA: "tokenA",
      symbolB: "tokenB",
      urlA: "https://tokenA.com",
      urlB: "https://tokenB.com",
    }).accounts({
      user: owner.publicKey,
      feeAuthority: feeAuthority,
      market,
...
```
- Calculate "Yes" and "No" token regarding trading result
```rust
pub fn set_token_price(&mut self, sell_token_amount: u64, is_yes: bool) -> Result<()> {
        if is_yes {
            self.token_a_amount = self.token_a_amount - sell_token_amount;
            self.token_price_b = self.token_price_b + sell_token_amount;
        } else {
            self.token_b_amount = self.token_b_amount - sell_token_amount;
            self.token_price_a = self.token_price_a + sell_token_amount;
        }

        self.token_price_a = self
            .total_reserve
            .checked_mul(self.token_a_amount + self.token_b_amount)
            .ok_or(ContractError::ArithmeticError)?
            .checked_div(self.token_a_amount)
            .ok_or(ContractError::ArithmeticError)?;
        self.token_price_b = self
            .total_reserve
            .checked_mul(self.token_a_amount + self.token_b_amount)
            .ok_or(ContractError::ArithmeticError)?
            .checked_div(self.token_b_amount)
            .ok_or(ContractError::ArithmeticError)?;
        Ok(())
    }
```
### 3️⃣ Liqudity Deposite
- Users can deposite sol to market which is already created
```typescript
 let tx = await program.methods.addLiquidity(new BN(0.1 * 10 ** 9))
    .accounts({
      user: owner.publicKey,
      creator: owner.publicKey,
      feeAuthority: feeAuthority,
      market,
      global,
      systemProgram: SystemProgram.programId,
    }).transaction();
...
```
- Once sol amount reaches specific value it changes market status. So users can start betting.
```rust
let market_balance = ctx.accounts.market.get_lamports();
if market_balance >= ctx.accounts.global.market_count {
  ctx.accounts.market.market_status = MarketStatus::Active;
}
```
### 4️⃣ Betting on Market
- Users buy token "Yes" or "No" Token
```typescript

    const tx = await program.methods.createBet({
      amount: new BN(10000),
      isYes: true,
    }).accounts({
      user: owner.publicKey,
      creator: owner.publicKey,
      tokenMint: tokenA,
      pdaTokenAccount: pdaTokenAAccount,
      userTokenAccount: userTokenAAccount,
      feeAuthority: feeAuthority,
      market,
      global,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).transaction();
```
- Prices of both token will be changed ans flowing token amount.

### 4️⃣ Betting on Market
- Resolve Market prediction result from Oracle.
```rust
let feed = &ctx.accounts.feed_aggregator.load()?;
let current_sol_price: f64 = feed.get_result()?.try_into()?;

msg!("🎫Current SOL/USD price 🎫{}", current_sol_price);

let feed_account = ctx.accounts.feed.data.borrow();
let feed: std::cell::Ref<'_, PullFeedAccountData> =
  PullFeedAccountData::parse(feed_account).unwrap();
msg!("🎫price 🎫 {:?}", feed.value());

if ctx.accounts.market.quest <= feed.value().unwrap().try_into().unwrap() {
  ctx.accounts.market.update_result(true);
} else {
  ctx.accounts.market.update_result(false);
}
```

---

## 🛠 Installation & Setup
### 🔹 Prerequisites
- Rust & Solana CLI  
- Anchor framework  
- Node.js & npm  

### 🔹 Install Dependencies
\`\`\`bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Install Node.js dependencies
npm install
\`\`\`

### 🔹 Build & Deploy
\`\`\`bash
anchor build
anchor deploy
\`\`\`

---

## 📝 Example Usage
### 1️⃣ Create a Market
\`\`\`update seed on const file
```typescript
export const GLOBAL_SEED = "global_7";
export const MARKET_SEED = "market_7";
export const MINT_SEED_A = "mint_a_7";
export const MINT_SEED_B = "mint_b_7";
```
```rust
pub const GLOBAL_SEED: &'static str = "global_7";
pub const MARKET_SEED: &'static str = "market_7";
pub const MINT_SEED_A: &'static str = "mint_a_7";
pub const MINT_SEED_B: &'static str = "mint_b_7";
```
\`\`\`
### 2️⃣ Run test
```
anchor test
```

---

## 💬 Contact

- **GitHub**: [Prediction-Market](https://github.com/novustch/Prediction-Market.git)
- **Telegram**: [@novustch](https://t.me/novustch)
- **Twitter/X**: [@novustch](https://x.com/novustch)
---
