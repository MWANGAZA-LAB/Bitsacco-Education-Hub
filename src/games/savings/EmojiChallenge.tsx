import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface EmojiChallengeProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const EmojiChallenge: React.FC<EmojiChallengeProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [hasCompleted, setHasCompleted] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const emojis = [
    { emoji: '🔥', name: 'Fire', description: 'Hot and powerful!' },
    { emoji: '💎', name: 'Diamond', description: 'Precious and strong!' },
    { emoji: '🚀', name: 'Rocket', description: 'To the moon!' },
    { emoji: '⚡', name: 'Lightning', description: 'Fast and electric!' },
    { emoji: '🌟', name: 'Star', description: 'Shining bright!' },
    { emoji: '💪', name: 'Muscle', description: 'Strong and ready!' }
  ];

  const completeChallenge = () => {
    if (!selectedEmoji) return;

    // Fixed 40 KES reward for completing the challenge
    setKesEarned(40);
    setHasCompleted(true);
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasCompleted(false);
    setSelectedEmoji('');
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Emoji Challenge"
        kesEarned={kesEarned}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
        onGoToEducation={onGoToEducation}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Emoji Challenge</h3>
        <p className="text-gray-400">
          Choose your favorite emoji and earn 40 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={hasCompleted ? { 
            scale: [1, 1.3, 1],
            rotate: [0, 360]
          } : {}}
          transition={hasCompleted ? { duration: 1 } : {}}
        >
          🔥
        </motion.div>
        
        {!hasCompleted ? (
          <div className="space-y-4">
            <p className="text-gray-300">Pick your power emoji!</p>
            <div className="grid grid-cols-2 gap-4">
              {emojis.map((item) => (
                <motion.button
                  key={item.emoji}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedEmoji === item.emoji
                      ? 'border-purple-400 bg-purple-500/20'
                      : 'border-gray-600 hover:border-purple-500'
                  }`}
                  onClick={() => setSelectedEmoji(item.emoji)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-sm font-medium text-gray-300 mb-1">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-purple-400">
              You earned 40 KES!
            </div>
            <p className="text-gray-300">Amazing choice! {selectedEmoji}</p>
          </div>
        )}
      </div>
      
      {!hasCompleted ? (
        <motion.button 
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={completeChallenge}
          disabled={!selectedEmoji}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Complete Challenge
        </motion.button>
      ) : (
        <motion.button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          onClick={handleComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Collect Reward
        </motion.button>
      )}

      <div className="text-sm text-gray-500">
        <p>🔥 Choose your power emoji</p>
        <p>💰 Fixed reward of 40 KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default EmojiChallenge;
