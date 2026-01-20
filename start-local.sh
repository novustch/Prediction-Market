#!/bin/bash

echo "🚀 Starting CheckBrice Local Development..."
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Not in the project root directory!"
    echo "Please navigate to the Prediction-Marketcopy folder first"
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps

echo ""
echo "✅ Backend ready! Starting backend server..."
npm run dev &
BACKEND_PID=$!

echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install --legacy-peer-deps

echo ""
echo "✅ Frontend ready! Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ CheckBrice is starting!"
echo ""
echo "📡 Backend:  http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Wait for Ctrl+C
wait $BACKEND_PID $FRONTEND_PID
