import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Wallet } from 'lucide-react';

interface PostGameInterfaceProps {
  gameName: string;
  kesEarned: number;
  onPlayAgain: () => void;
  onReturnToGames: () => void;
}

const PostGameInterface: React.FC<PostGameInterfaceProps> = ({
  gameName,
  kesEarned,
  onPlayAgain,
  onReturnToGames
}) => {
  const handleMakeDeposit = () => {
    // Open Bitsacco personal account page in a new tab
    window.open('https://app.bitsacco.com/personal', '_blank');
  };

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success Message */}
      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg p-8">
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 0.8 }}
        >
          🎉
        </motion.div>
        
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Reward Collected!
        </h2>
        <p className="text-lg text-gray-300 mb-4">
          You earned <span className="text-green-400 font-bold">{kesEarned} KES</span> from {gameName}!
        </p>
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-400 text-lg">💡</span>
            <span className="text-blue-400 font-semibold">Deposit Reminder</span>
          </div>
          <p className="text-sm text-gray-300">
            Don't forget to deposit <span className="text-blue-400 font-bold">{kesEarned} KES</span> in your Bitsacco account to keep the fire burning! 🔥
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Make Deposit Button - Primary Action */}
        <motion.button
          className="w-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-600 hover:to-bitcoin-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          onClick={handleMakeDeposit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wallet className="w-5 h-5" />
          <span>Make Deposit to Bitsacco Account</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>

        <motion.button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          onClick={onPlayAgain}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🎮 Play Again
        </motion.button>
        
        <motion.button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          onClick={onReturnToGames}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🎯 More Games
        </motion.button>
      </div>

      {/* Enhanced Motivational Message */}
      <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-orange-400 text-lg">🔥</span>
          <span className="text-orange-400 font-semibold">Keep the fire burning!</span>
        </div>
        <p className="text-sm text-gray-300">
          Every KES saved brings you closer to your Bitcoin goals. Make your deposit now to start building your future!
        </p>
        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-400">
            💡 <strong>Pro Tip:</strong> Regular deposits, even small amounts, compound over time. Consistency beats perfection!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PostGameInterface;
