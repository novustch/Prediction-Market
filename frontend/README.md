# Prediction Market Frontend

This is the frontend application for the Solana Prediction Market, built with Next.js 15, React 19, and TailwindCSS 4.0.

## Features

- **Market Browsing** - View active, pending, and resolved prediction markets
- **Market Creation** - Create custom prediction markets with oracle feeds
- **Liquidity Management** - Add funds to markets to increase liquidity
- **Betting Interface** - Place bets on "Yes" or "No" outcomes
- **User Profile** - View betting history and market participation
- **Referral System** - Generate and manage referral codes
- **Real-time Updates** - Live market data and recent activity feed
- **Wallet Integration** - Connect with Phantom and other Solana wallets

## Tech Stack

- **Framework**: Next.js 15.2.1 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 4.0.12
- **Blockchain**: Solana (@solana/web3.js 1.98.0)
- **Wallet**: Solana Wallet Adapter
- **Smart Contracts**: Anchor 0.29.0
- **Oracles**: Switchboard
- **Animations**: Framer Motion 12.10.5
- **HTTP Client**: Axios 1.8.4

## Getting Started

### Prerequisites

- Node.js v18 or higher
- Yarn or npm package manager
- Phantom wallet (or other Solana wallet) browser extension

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/novustch/Prediction-Market.git
    cd Prediction-Market/frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx          # Home page
│   │   ├── propose/          # Market creation page
│   │   ├── fund/             # Market funding pages
│   │   ├── profile/          # User profile page
│   │   ├── referral/         # Referral system page
│   │   └── about/            # About page
│   ├── components/           # React components
│   │   ├── elements/         # UI components
│   │   │   ├── marketInfo/   # Market display components
│   │   │   ├── fund/         # Funding components
│   │   │   ├── profile/      # Profile components
│   │   │   └── carousel/     # Market carousel
│   │   └── layouts/          # Layout components
│   ├── providers/            # Context providers
│   │   └── GlobalContext.tsx
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript type definitions
│   └── data/                 # Static data
├── public/                   # Static assets
│   └── fonts/               # Custom fonts
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # TailwindCSS configuration
└── package.json             # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### Home (`/`)
- Market carousel with featured markets
- Active markets list
- Recent activity feed
- Market filtering and search

### Propose (`/propose`)
- Create new prediction markets
- Configure oracle feeds
- Set market parameters

### Fund (`/fund` and `/fund/[id]`)
- Browse markets available for funding
- Add liquidity to markets
- View market details and funding progress

### Profile (`/profile`)
- View betting history
- Track market participation
- View created markets

### Referral (`/referral`)
- Generate referral codes
- View referral statistics
- Claim referral rewards

### About (`/about`)
- Project information
- FAQ section

## Configuration

### Solana Network

The app is configured to connect to Solana Devnet by default. You can modify the network in `src/app/layout.tsx`:

```typescript
<ConnectionProvider endpoint={clusterApiUrl("devnet")}>
```

Options: `"devnet"`, `"mainnet-beta"`, or a custom RPC endpoint.

### Backend API

The frontend connects to the backend API. Ensure the backend server is running and update the API base URL in your components if needed.

## Wallet Integration

The app uses Solana Wallet Adapter to connect with:
- Phantom Wallet
- Other Solana-compatible wallets

Users must connect their wallet to:
- Create markets
- Add liquidity
- Place bets
- Claim rewards

## Styling

The app uses TailwindCSS 4.0 with custom configuration:
- Custom fonts (Rubik, Inter, Satoshi, Anton SC)
- Dark theme by default
- Responsive design
- Custom color scheme

## Development

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. The route will be automatically available

### Adding Components

1. Create components in `src/components/elements/`
2. Export from appropriate index files
3. Import and use in pages

### State Management

The app uses React Context API via `GlobalContext` for global state management. Add new state as needed.

## Build and Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## 💬 Contact

- **GitHub**: [Prediction-Market](https://github.com/novustch/Prediction-Market.git)
- **Telegram**: [@novustch](https://t.me/novustch)
- **Twitter/X**: [@novustch](https://x.com/novustch)
