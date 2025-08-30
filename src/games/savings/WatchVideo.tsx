import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface WatchVideoProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const WatchVideo: React.FC<WatchVideoProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [isWatching, setIsWatching] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const watchVideo = () => {
    if (isWatching) return;

    setIsWatching(true);
    
    // Simulate video watching
    setTimeout(() => {
      // Random KES between 25-250
      const earned = Math.floor(Math.random() * 226) + 25;
      setKesEarned(earned);
      setHasWatched(true);
      setIsWatching(false);
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasWatched(false);
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Watch Video"
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
        <h3 className="text-xl font-bold text-white mb-2">Watch Video</h3>
        <p className="text-gray-400">
          Watch a Bitcoin video and earn 25-250 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={isWatching ? { 
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1]
          } : {}}
          transition={isWatching ? { duration: 1, repeat: 2 } : {}}
        >
          🎥
        </motion.div>
        
        {!hasWatched ? (
          <div className="space-y-2">
            <p className="text-gray-300">Click to watch Bitcoin video!</p>
            <p className="text-sm text-gray-500">Learn while earning KES</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-red-400">
              You earned {kesEarned} KES!
            </div>
            <p className="text-gray-300">Great learning! 📚</p>
          </div>
        )}
      </div>
      
      {!hasWatched ? (
        <motion.button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={watchVideo}
          disabled={isWatching}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isWatching ? 'Watching...' : 'Watch Video'}
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
        <p>🎥 Click to watch Bitcoin video</p>
        <p>💰 Random reward between 25-250 KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default WatchVideo;
