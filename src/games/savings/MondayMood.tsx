import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface MondayMoodProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const MondayMood: React.FC<MondayMoodProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [hasShared, setHasShared] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const moods = [
    { emoji: '😴', name: 'Sleepy', reward: 25 },
    { emoji: '😊', name: 'Happy', reward: 50 },
    { emoji: '😤', name: 'Motivated', reward: 75 },
    { emoji: '😎', name: 'Cool', reward: 60 },
    { emoji: '🤔', name: 'Thoughtful', reward: 40 },
    { emoji: '💪', name: 'Strong', reward: 70 }
  ];

  const shareMood = () => {
    if (!selectedMood) return;

    const mood = moods.find(m => m.emoji === selectedMood);
    if (mood) {
      setKesEarned(mood.reward);
      setHasShared(true);
    }
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasShared(false);
    setSelectedMood('');
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Monday Mood"
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
        <h3 className="text-xl font-bold text-white mb-2">Monday Mood</h3>
        <p className="text-gray-400">
          Share your Monday mood and earn 25-75 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={hasShared ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={hasShared ? { duration: 0.8 } : {}}
        >
          🌞
        </motion.div>
        
        {!hasShared ? (
          <div className="space-y-4">
            <p className="text-gray-300">How's your Monday mood?</p>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((mood) => (
                <motion.button
                  key={mood.emoji}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMood === mood.emoji
                      ? 'border-yellow-400 bg-yellow-500/20'
                      : 'border-gray-600 hover:border-yellow-500'
                  }`}
                  onClick={() => setSelectedMood(mood.emoji)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs text-gray-300">{mood.name}</div>
                  <div className="text-xs text-yellow-400">{mood.reward} KES</div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-yellow-400">
              You earned {kesEarned} KES!
            </div>
            <p className="text-gray-300">Great mood! Keep it up! 🌟</p>
          </div>
        )}
      </div>
      
      {!hasShared ? (
        <motion.button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={shareMood}
          disabled={!selectedMood}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share Mood
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
        <p>🌞 Select your Monday mood</p>
        <p>💰 Different moods earn different KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default MondayMood;
