import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface HodlLettersProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const HodlLetters: React.FC<HodlLettersProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [foundLetters, setFoundLetters] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const letters = [
    { letter: 'H', found: false, x: 10, y: 20 },
    { letter: 'O', found: false, x: 30, y: 40 },
    { letter: 'D', found: false, x: 50, y: 60 },
    { letter: 'L', found: false, x: 70, y: 80 }
  ];

  const [gameLetters, setGameLetters] = useState(letters);

  const findLetter = (letter: string) => {
    if (foundLetters.includes(letter)) return;

    const newFoundLetters = [...foundLetters, letter];
    setFoundLetters(newFoundLetters);

    // Update game letters
    setGameLetters(prev => prev.map(l => 
      l.letter === letter ? { ...l, found: true } : l
    ));

    // Check if all letters found
    if (newFoundLetters.length === 4) {
      setKesEarned(20); // Fixed 20 KES reward
      setHasCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasCompleted(false);
    setFoundLetters([]);
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="HODL Letters"
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
        <h3 className="text-xl font-bold text-white mb-2">HODL Letters</h3>
        <p className="text-gray-400">
          Find HODL letters and earn 20 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={hasCompleted ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={hasCompleted ? { duration: 0.8 } : {}}
        >
          🟠
        </motion.div>
        
        {!hasCompleted ? (
          <div className="space-y-4">
            <p className="text-gray-300">Find all the HODL letters!</p>
            
            {/* Progress */}
            <div className="flex justify-center space-x-2 mb-4">
              {['H', 'O', 'D', 'L'].map((letter) => (
                <div
                  key={letter}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    foundLetters.includes(letter)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>

            {/* Letter Grid */}
            <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
              {gameLetters.map((item) => (
                <motion.button
                  key={item.letter}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all ${
                    item.found
                      ? 'border-orange-400 bg-orange-500 text-white'
                      : 'border-gray-600 hover:border-orange-500 text-gray-300 hover:text-white'
                  }`}
                  onClick={() => findLetter(item.letter)}
                  disabled={item.found}
                  whileHover={{ scale: item.found ? 1 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.letter}
                </motion.button>
              ))}
            </div>

            <p className="text-sm text-gray-400">
              Found: {foundLetters.length}/4 letters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-orange-400">
              You earned 20 KES!
            </div>
            <p className="text-gray-300">HODL strong! 🟠</p>
            <div className="flex justify-center space-x-2">
              {['H', 'O', 'D', 'L'].map((letter) => (
                <div
                  key={letter}
                  className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {hasCompleted && (
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
        <p>🟠 Find all HODL letters</p>
        <p>💰 Fixed reward of 20 KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default HodlLetters;
