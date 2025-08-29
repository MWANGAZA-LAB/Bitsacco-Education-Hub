import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface SatJokeProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const SatJoke: React.FC<SatJokeProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [isRating, setIsRating] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showPostGame, setShowPostGame] = useState(false);


  const jokes = [
    "Why did the Bitcoin go to therapy? Because it had too many blocks! 😄",
    "What do you call a Bitcoin that's always late? Satoshi Nakamoto! 😂",
    "Why don't Bitcoiners like banks? Because they're too centralized! 🤣",
    "What's a Bitcoin's favorite dance? The HODL! 💃",
    "Why did the satoshi cross the blockchain? To get to the other side! 🚀"
  ];

  const [currentJoke] = useState(jokes[Math.floor(Math.random() * jokes.length)]);

  const rateJoke = () => {
    if (isRating) return;

    setIsRating(true);
    
    setTimeout(() => {
      setHasRated(true);
      setIsRating(false);
    }, 1000);
  };

  const handleComplete = () => {
    onComplete(50); // Fixed 50 KES reward
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasRated(false);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Sat Joke"
        kesEarned={50}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
        onGoToEducation={onGoToEducation}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Sat Joke</h3>
        <p className="text-gray-400">
          Rate a Bitcoin joke and earn 50 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-8">
        <motion.div 
          className="text-4xl mb-4"
          animate={isRating ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={isRating ? { duration: 0.5 } : {}}
        >
          😂
        </motion.div>
        
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-300 text-lg italic">"{currentJoke}"</p>
          </div>
          
          {!hasRated ? (
            <div className="space-y-2">
              <p className="text-gray-300">Rate this joke!</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    className="text-2xl hover:scale-110 transition-transform"
                    onClick={() => rateJoke()}
                    disabled={isRating}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ⭐
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-yellow-400">
                You earned 50 KES!
              </div>
              <p className="text-gray-300">Thanks for rating! 😄</p>
            </div>
          )}
        </div>
      </div>
      
      {hasRated && (
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
        <p>😂 Rate the Bitcoin joke</p>
        <p>💰 Fixed reward of 50 KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default SatJoke;
