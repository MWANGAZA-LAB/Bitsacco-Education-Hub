import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, BookOpen } from 'lucide-react';

const SnakeSats: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  const handlePlayGame = () => {
    setShowGame(true);
  };

  const handleBackToInfo = () => {
    setShowGame(false);
  };

  if (showGame) {
    return (
      <div className="space-y-4">
        {/* Game header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Snake Sats Game</h3>
          <button
            onClick={handleBackToInfo}
            className="btn-secondary text-sm"
          >
            Back to Info
          </button>
        </div>

        {/* Game iframe */}
        <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
          <iframe
            src="https://mwangaza-lab.github.io/snakesats/"
            className="w-full h-full border-0"
            title="Snake Sats Game"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Game instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="text-blue-400 font-semibold">How to Play</span>
          </div>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Use arrow keys to control the snake</li>
            <li>• Collect Bitcoin symbols to grow and earn points</li>
            <li>• Avoid hitting the walls or yourself</li>
            <li>• Learn about Bitcoin while having fun!</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">🐍 Snake Sats</h3>
        <p className="text-gray-400">
          Learn about Bitcoin through the classic Snake game!
        </p>
      </div>

      {/* Game preview */}
      <motion.div
        className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-4xl mb-4">🐍</div>
        <h4 className="text-lg font-semibold text-white mb-2">
          Bitcoin Snake Game
        </h4>
        <p className="text-gray-300 text-sm mb-4">
          Control a snake and collect Bitcoin symbols while learning about 
          cryptocurrency concepts. A fun way to understand Bitcoin basics!
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <span>🎮 Educational</span>
          <span>•</span>
          <span>📚 Learn Bitcoin</span>
          <span>•</span>
          <span>🎯 Fun & Interactive</span>
        </div>
      </motion.div>

      {/* Educational content */}
      <div className="space-y-4">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-400 font-semibold">What You'll Learn</span>
          </div>
          <ul className="text-sm text-gray-300 space-y-1 text-left">
            <li>• Bitcoin basics and terminology</li>
            <li>• How cryptocurrency works</li>
            <li>• The concept of digital scarcity</li>
            <li>• Why Bitcoin is valuable</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ExternalLink className="w-5 h-5 text-blue-500" />
            <span className="text-blue-400 font-semibold">External Game</span>
          </div>
          <p className="text-sm text-gray-300">
            This game is hosted externally and will open in an iframe. 
            Make sure you have a stable internet connection to play.
          </p>
        </div>
      </div>

      {/* Play button */}
      <motion.button
        className="btn-primary flex items-center justify-center space-x-2 mx-auto"
        onClick={handlePlayGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play className="w-5 h-5" />
        <span>Play Snake Sats</span>
      </motion.button>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500">
        <p>⚠️ This is an educational game. No real Bitcoin rewards.</p>
        <p>🎮 Game hosted by mwangaza-lab.github.io</p>
      </div>
    </div>
  );
};

export default SnakeSats;
