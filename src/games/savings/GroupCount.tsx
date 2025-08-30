import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface GroupCountProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const GroupCount: React.FC<GroupCountProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [hasCounted, setHasCounted] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const groupSizes = [
    { count: 5, label: 'Small Group', reward: 25 },
    { count: 10, label: 'Medium Group', reward: 50 },
    { count: 25, label: 'Large Group', reward: 100 },
    { count: 50, label: 'Big Group', reward: 200 },
    { count: 100, label: 'Huge Group', reward: 350 },
    { count: 500, label: 'Massive Group', reward: 500 }
  ];

  const countGroup = () => {
    if (!selectedCount) return;

    const group = groupSizes.find(g => g.count === selectedCount);
    if (group) {
      setKesEarned(group.reward);
      setHasCounted(true);
    }
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasCounted(false);
    setSelectedCount(0);
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Group Count"
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
        <h3 className="text-xl font-bold text-white mb-2">Group Count</h3>
        <p className="text-gray-400">
          Count your group and earn 5-500 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={hasCounted ? { 
            scale: [1, 1.2, 1],
            y: [0, -10, 0]
          } : {}}
          transition={hasCounted ? { duration: 0.6 } : {}}
        >
          👥
        </motion.div>
        
        {!hasCounted ? (
          <div className="space-y-4">
            <p className="text-gray-300">How many people in your group?</p>
            <div className="grid grid-cols-2 gap-3">
              {groupSizes.map((group) => (
                <motion.button
                  key={group.count}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCount === group.count
                      ? 'border-green-400 bg-green-500/20'
                      : 'border-gray-600 hover:border-green-500'
                  }`}
                  onClick={() => setSelectedCount(group.count)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-sm font-medium text-gray-300 mb-1">{group.count}</div>
                  <div className="text-xs text-gray-400 mb-1">{group.label}</div>
                  <div className="text-xs text-green-400">{group.reward} KES</div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-green-400">
              You earned {kesEarned} KES!
            </div>
            <p className="text-gray-300">Great group size! 👥</p>
          </div>
        )}
      </div>
      
      {!hasCounted ? (
        <motion.button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={countGroup}
          disabled={!selectedCount}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Count Group
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
        <p>👥 Select your group size</p>
        <p>💰 Bigger groups earn more KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default GroupCount;
