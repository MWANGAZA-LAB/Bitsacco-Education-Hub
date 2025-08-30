import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface RollDiceProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const RollDice: React.FC<RollDiceProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [hasRolled, setHasRolled] = useState(false);
  const [showPostGame, setShowPostGame] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);
    setHasRolled(false);

    // Simulate dice rolling animation
    setTimeout(() => {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      // Convert dice result to KES (5-30 range)
      const kesEarned = Math.floor((diceResult / 6) * 25) + 5; // 5-30 KES
      setResult(kesEarned);
      setHasRolled(true);
      setIsRolling(false);
    }, 1000);
  };

  const handleComplete = () => {
    if (result !== null) {
      onComplete(result);
      setShowPostGame(true);
    }
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasRolled(false);
    setResult(null);
  };

  // Show post-game interface if reward was collected
  if (showPostGame && result !== null) {
    return (
      <PostGameInterface
        gameName="Roll the Dice"
        kesEarned={result}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
        onGoToEducation={onGoToEducation}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Roll the Dice</h3>
        <p className="text-gray-400">
          Roll a dice and earn 5-30 KES based on your result!
        </p>
      </div>

      {/* Dice display */}
      <div className="flex justify-center">
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-4xl font-bold text-white shadow-lg"
          animate={isRolling ? { rotate: [0, 360] } : {}}
          transition={isRolling ? { duration: 0.5, repeat: Infinity } : {}}
        >
          {result !== null ? (
            <span>🎲</span>
          ) : (
            <span>🎲</span>
          )}
        </motion.div>
      </div>

      {/* Roll button */}
      {!hasRolled && (
        <motion.button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={rollDice}
          disabled={isRolling}
          aria-label={isRolling ? 'Rolling dice...' : 'Roll the dice to earn KES'}
          aria-describedby="dice-instructions"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </motion.button>
      )}

      {/* Result display */}
      {hasRolled && result !== null && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400 mb-2">
              You earned {result} KES!
            </div>
            <div className="text-sm text-gray-300">
              Great roll! Keep the fire burning! 🔥
            </div>
          </div>

                     <motion.button
             className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
             onClick={handleComplete}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             Collect Reward
           </motion.button>
        </motion.div>
      )}

      {/* Instructions */}
      <div id="dice-instructions" className="text-sm text-gray-500">
        <p>🎲 Click the button to roll the dice</p>
        <p>💰 Higher numbers earn more KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default RollDice;
