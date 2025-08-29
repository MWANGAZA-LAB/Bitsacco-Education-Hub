import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface DrawEnvelopeProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
  onGoToEducation: () => void;
}

const DrawEnvelope: React.FC<DrawEnvelopeProps> = ({ onComplete, onReturnToGames, onGoToEducation }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);

  const drawEnvelope = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    
    // Simulate drawing animation
    setTimeout(() => {
      // Random KES between 10-100
      const earned = Math.floor(Math.random() * 91) + 10;
      setKesEarned(earned);
      setHasDrawn(true);
      setIsDrawing(false);
    }, 1500);
  };

  const handleComplete = () => {
    onComplete(kesEarned);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasDrawn(false);
    setKesEarned(0);
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Draw Envelope"
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
        <h3 className="text-xl font-bold text-white mb-2">Draw Envelope</h3>
        <p className="text-gray-400">
          Draw an envelope and earn 10-100 KES!
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-8">
        <motion.div 
          className="text-6xl mb-4"
          animate={isDrawing ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={isDrawing ? { duration: 0.5, repeat: 3 } : {}}
        >
          ✉️
        </motion.div>
        
        {!hasDrawn ? (
          <p className="text-gray-300">Click to draw your envelope!</p>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-blue-400">
              You earned {kesEarned} KES!
            </div>
            <p className="text-gray-300">Great envelope! 📬</p>
          </div>
        )}
      </div>
      
      {!hasDrawn ? (
        <motion.button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={drawEnvelope}
          disabled={isDrawing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDrawing ? 'Drawing...' : 'Draw Envelope'}
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
        <p>✉️ Click to draw your envelope</p>
        <p>💰 Random reward between 10-100 KES</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default DrawEnvelope;
