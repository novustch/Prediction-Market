"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BitcoinMarketCardProps {
  id: string;
  question: string;
  description?: string;
  image: string;
  yesPercent: number;
  noPercent: number;
  volume: string;
  deadline: string;
  onVote?: (side: 'YES' | 'NO') => void;
}

export default function BitcoinMarketCard({
  question,
  description,
  image,
  yesPercent,
  noPercent,
  volume,
  deadline,
  onVote,
}: BitcoinMarketCardProps) {
  const formatDeadline = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'TBD';
    }
  };

  const formatVolume = (vol: string) => {
    const num = parseFloat(vol);
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  return (
    <motion.div
      className="bg-cream rounded-3xl overflow-hidden shadow-2xl border-2 border-navy/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={question}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Question */}
        <h3 className="text-2xl font-bold text-navy leading-tight">
          {question}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-navy/70 text-sm line-clamp-2">
            {description}
          </p>
        )}

        {/* Voting Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVote?.('YES')}
            className="flex-1 bg-yes text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-1">💚</div>
            <div>YES {yesPercent}%</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVote?.('NO')}
            className="flex-1 bg-no text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-1">❤️</div>
            <div>NO {noPercent}%</div>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-navy/60 pt-2 border-t border-navy/10">
          <div className="flex items-center gap-2">
            <span>💰 Volume:</span>
            <span className="font-semibold text-navy">{formatVolume(volume)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰ Ends:</span>
            <span className="font-semibold text-navy">{formatDeadline(deadline)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
