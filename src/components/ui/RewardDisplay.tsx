import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RewardDisplayProps {
  kesEarned: number;
  message: string;
  isError?: boolean;
  showIcon?: boolean;
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({
  kesEarned,
  message,
  isError = false,
  showIcon = true
}) => {
  if (isError) {
    return (
      <motion.div
        className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">❌ Error</div>
          <p className="text-gray-300">{message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-bitcoin-500/20 border border-bitcoin-500/30 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {showIcon && (
          <div className="text-2xl mb-2">🎉</div>
        )}
        <div className="text-lg font-bold text-bitcoin-500 mb-2">
          {message}
        </div>
        {kesEarned > 0 && (
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-bitcoin-500" />
            <span className="text-bitcoin-500 font-bold text-xl">
              +KES {kesEarned.toLocaleString()} earned!
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RewardDisplay;
