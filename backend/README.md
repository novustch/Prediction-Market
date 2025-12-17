# Prediction Market Backend

This is the backend service for a prediction market application. It is built using Node.js, TypeScript, Express, and MongoDB. The backend interacts with the Solana blockchain to manage prediction markets, handle liquidity, and process bets.

## Features

- **Prediction Market Management**: Create and manage prediction markets
- **Liquidity Management**: Add liquidity to markets to enable betting
- **Betting System**: Process bets on prediction outcomes
- **Blockchain Integration**: Interacts with the Solana blockchain using Anchor and SPL Token libraries
- **MongoDB Integration**: Stores market and user data in MongoDB
- **Oracle Integration**: Register and manage custom oracle feeds for market resolution
- **Referral System**: Generate referral codes and manage referral rewards
- **User Profiles**: Track user betting history and market participation

## Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express 5.1.0
- **Language**: TypeScript 5.8.2
- **Database**: MongoDB (via Mongoose 8.13.1)
- **Blockchain**: Solana (via @solana/web3.js 1.98.0)
- **Smart Contracts**: Anchor 0.29.0 (@coral-xyz/anchor)
- **Oracles**: Switchboard (@switchboard-xyz/on-demand, @switchboard-xyz/common)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/novustch/Prediction-Market.git
    cd Prediction-Market/backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables:**
    ```bash
    cp env.example .env
    ```
    
    Then edit `.env` with your configuration:
    ```env
    PORT=9000
    DB_URL=your_mongodb_connection_string
    PASSKEY=your_passkey
    FEE_AUTHORITY=your_fee_authority_public_key
    ```

4. **Run the server:**
    ```bash
    # Development mode (with hot reload)
    npm run dev
    # or
    yarn dev

    # Production mode
    npm start
    # or
    yarn start
    ```

The server will start on `http://localhost:9000` (or your configured PORT).

## Project Structure

```
backend/
├── src/
│   ├── config.ts              # Configuration and MongoDB connection
│   ├── index.ts               # Express server entry point
│   ├── controller/            # Business logic controllers
│   │   ├── market/            # Market-related operations
│   │   ├── oracle/            # Oracle feed management
│   │   ├── referral/          # Referral system
│   │   ├── profile/           # User profile management
│   │   ├── bot/               # Bot utilities
│   │   └── initialize/        # Initialization logic
│   ├── router/                # API route definitions
│   │   ├── market/            # Market routes
│   │   ├── oracle/            # Oracle routes
│   │   ├── referral/          # Referral routes
│   │   └── profile/           # Profile routes
│   ├── model/                 # MongoDB models
│   │   ├── market.ts          # Market schema
│   │   ├── recent.ts          # Recent activity schema
│   │   └── referral.ts        # Referral schema
│   ├── middleware/            # Express middleware
│   │   └── proposeValidator.ts
│   ├── prediction_market_sdk/ # Solana SDK integration
│   │   ├── index.ts           # Main SDK functions
│   │   ├── config.ts          # SDK configuration
│   │   ├── constants.ts        # Program constants
│   │   ├── util.ts            # Utility functions
│   │   └── idl/               # Anchor IDL files
│   ├── oracle_service/        # Oracle service utilities
│   │   └── simulateFeed.ts
│   ├── type/                  # TypeScript type definitions
│   └── prediction.json        # Wallet keypair (keep secure!)
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── env.example                # Environment variables template
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Market Endpoints

- `POST /api/market/create` - Create a new prediction market
  - Requires validation middleware
  - Body: Market creation data

- `POST /api/market/add` - Add additional information to a market
  - Body: Market update data

- `POST /api/market/addLiquidity` - Add liquidity to a market
  - Body: Market ID and liquidity amount

- `POST /api/market/betting` - Place a bet on a market
  - Body: Market ID, bet amount, and outcome (Yes/No)

- `POST /api/market/liquidity` - Alternative liquidity endpoint
  - Body: Market ID and liquidity amount

- `GET /api/market/get` - Get market data
  - Query params: Market filters

### Oracle Endpoints

- `POST /api/oracle/registFeed` - Register a custom oracle feed
  - Requires validation middleware
  - Body: Feed registration data

### Referral Endpoints

- `POST /api/referral/` - Get or generate referral code
  - Body: Wallet address and optional referral code

- `POST /api/referral/claim` - Claim referral rewards
  - Body: Wallet address and reward amount

### Profile Endpoints

- `GET /api/profile/` - Get user profile data
  - Query params: Wallet address

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 9000) |
| `DB_URL` | MongoDB connection string | Yes |
| `PASSKEY` | Application passkey | Yes |
| `FEE_AUTHORITY` | Solana fee authority public key | Yes |

## Development

### Scripts

- `npm run dev` - Start development server with hot reload (ts-node-dev)
- `npm start` - Start production server (ts-node)
- `npm run build` - Compile TypeScript to JavaScript

### Code Style

- TypeScript strict mode enabled
- ESLint configuration recommended
- Follow Express.js best practices

## Security Notes

⚠️ **Important**: The `src/prediction.json` file contains a wallet keypair. Never commit this file to version control. Add it to `.gitignore` and use environment variables or secure key management in production.

## Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `@coral-xyz/anchor` - Anchor framework for Solana
- `@solana/web3.js` - Solana JavaScript SDK
- `@switchboard-xyz/on-demand` - Switchboard oracle integration

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `ts-node-dev` - Development server with hot reload
- `@types/*` - TypeScript type definitions

## Troubleshooting

### MongoDB Connection Issues
- Verify your `DB_URL` is correct
- Check MongoDB network access settings
- Ensure MongoDB is running

### Solana Connection Issues
- Verify network configuration (devnet/mainnet)
- Check RPC endpoint availability
- Ensure wallet keypair is valid

### Port Already in Use
- Change the `PORT` in `.env`
- Or kill the process using the port

## 💬 Contact

- **GitHub**: [Prediction-Market](https://github.com/novustch/Prediction-Market.git)
- **Telegram**: [@novustch](https://t.me/novustch)
- **Twitter/X**: [@novustch](https://x.com/novustch)
