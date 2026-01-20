# 🚀 Getting Started with CheckBrice (Local Development)

Super simple guide to run CheckBrice locally on your computer.

---

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional - for full backend features)

---

## 🎯 Quick Start (3 Steps)

### 1️⃣ Install Dependencies

```bash
# From the root directory
npm run install:all
```

This will install all dependencies for backend, frontend, and contracts.

### 2️⃣ Start the Backend

```bash
# In a terminal window
npm run dev:backend
```

The backend will start on `http://localhost:5000`

### 3️⃣ Start the Frontend

```bash
# In a NEW terminal window
npm run dev:frontend
```

The frontend will start on `http://localhost:3000`

---

## 🌐 Open in Browser

Go to: **http://localhost:3000**

You should see the CheckBrice homepage with Bitcoin prediction markets!

---

## 🎨 What You'll See

- **Homepage**: Bitcoin markets from Polymarket
- **Simple UI**: Click YES or NO to vote (wallet coming soon)
- **Zillaz.net colors**: Red-orange (#D94F30) theme
- **Real-time data**: Markets update from Polymarket API

---

## ⚙️ Environment Variables (Optional)

If you need to configure the backend, create a `.env` file:

### Backend `.env` (in `/backend` folder):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/checkbrice
SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Frontend `.env.local` (in `/frontend` folder):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Port already in use?
- Backend: Change port in `backend/.env` (PORT=5001)
- Frontend: It will auto-suggest another port (3001, 3002, etc.)

---

## 📱 Current Features (MVP)

✅ **Bitcoin Markets**: Fetched from Polymarket API
✅ **Simple UI**: Easy to understand cards
✅ **Real-time Updates**: Markets refresh automatically
✅ **Responsive Design**: Works on mobile/desktop
✅ **Zillaz.net Branding**: Custom colors and theme

🚧 **Coming Soon**:
- Wallet integration (Phantom)
- Actual betting functionality
- User profiles
- More market categories

---

## 🎯 Next Steps

1. **Test the UI**: Browse Bitcoin markets
2. **Check backend**: Visit `http://localhost:5000/api/polymarket/bitcoin`
3. **Customize colors**: Edit `frontend/tailwind.config.ts`
4. **Add features**: The code is super simple and commented

---

## 📚 Project Structure

```
CheckBrice/
├── backend/              # API server
│   ├── src/
│   │   ├── services/     # Polymarket API
│   │   ├── controller/   # Request handlers
│   │   └── router/       # API routes
│   └── package.json
│
├── frontend/             # Next.js app
│   ├── src/
│   │   ├── app/          # Pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   └── simple-home.tsx    # Main view
│   │   └── components/
│   │       └── simple/   # Bitcoin cards
│   └── package.json
│
└── contracts/            # Solana smart contracts (future)
```

---

## 🤝 Need Help?

- Backend not working? Check the terminal for errors
- Frontend issues? Look at the browser console (F12)
- API errors? Try `http://localhost:5000/api/polymarket/bitcoin` directly

---

## 🚀 Ready to Deploy?

Once everything works locally, we can deploy to **checkbrice.com** using Vercel!

Happy coding! 🎉
