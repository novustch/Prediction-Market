"use client";

import React, { useState, useEffect } from 'react';
import BitcoinMarketCard from '@/components/simple/BitcoinMarketCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Market {
  id: string;
  question: string;
  description: string;
  image: string;
  yesPercent: number;
  noPercent: number;
  volume: string;
  liquidity: string;
  deadline: string;
  active: boolean;
  slug: string;
}

export default function SimpleHome() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBitcoinMarkets();
  }, []);

  const fetchBitcoinMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/polymarket/bitcoin');

      if (!response.ok) {
        throw new Error('Failed to fetch markets');
      }

      const data = await response.json();

      if (data.success && data.markets) {
        setMarkets(data.markets);
      } else {
        setError('No markets found');
      }
    } catch (err) {
      console.error('Error fetching markets:', err);
      setError('Failed to load Bitcoin markets. Please try again.');
      toast.error('Failed to load markets');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (marketId: string, side: 'YES' | 'NO') => {
    // TODO: Implement wallet connection and betting logic
    toast.success(`You voted ${side}! (Wallet integration coming soon)`, {
      icon: side === 'YES' ? '💚' : '❤️',
    });
  };

  return (
    <div className="min-h-screen bg-navy px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-cream mb-4">
          Check<span className="text-primary">Brice</span>
        </h1>
        <p className="text-cream/80 text-xl">
          🚀 Predict Bitcoin prices. Win money if you're right.
        </p>
        <p className="text-cream/60 text-sm mt-2">
          Super simple. No complicated stuff. Just predict and earn.
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="text-cream/60 mt-4">Loading Bitcoin markets...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="bg-no/20 border border-no rounded-2xl p-8">
            <p className="text-cream text-lg mb-4">⚠️ {error}</p>
            <button
              onClick={fetchBitcoinMarkets}
              className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Markets Grid */}
      {!loading && !error && markets.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, index) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BitcoinMarketCard
                  {...market}
                  onVote={(side) => handleVote(market.id, side)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Markets State */}
      {!loading && !error && markets.length === 0 && (
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="bg-cream/10 border border-cream/20 rounded-2xl p-8">
            <p className="text-cream text-lg mb-4">
              📊 No Bitcoin markets available right now
            </p>
            <p className="text-cream/60 text-sm">
              Check back soon for new prediction markets!
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto text-center mt-16 pt-8 border-t border-cream/20"
      >
        <p className="text-cream/40 text-sm">
          Powered by Polymarket • Built on Solana
        </p>
      </motion.div>
    </div>
  );
}
