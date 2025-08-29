import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, BookOpen } from 'lucide-react';

const PrivacyJenga: React.FC = () => {
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
          <h3 className="text-lg font-semibold text-white">Privacy Jenga Game</h3>
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
            src="https://mwangaza-lab.github.io/Privacy-Jenga/"
            className="w-full h-full border-0"
            title="Privacy Jenga Game"
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
            <li>• Click and drag blocks to remove them</li>
            <li>• Learn about privacy concepts as you play</li>
            <li>• Don't let the tower fall!</li>
            <li>• Understand why privacy matters in the digital age</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">🧩 Privacy Jenga</h3>
        <p className="text-gray-400">
          Learn about privacy through the classic Jenga game!
        </p>
      </div>

      {/* Game preview */}
      <motion.div
        className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-4xl mb-4">🧩</div>
        <h4 className="text-lg font-semibold text-white mb-2">
          Privacy Jenga Game
        </h4>
        <p className="text-gray-300 text-sm mb-4">
          Remove blocks from the tower while learning about privacy concepts. 
          Each block represents a different aspect of digital privacy!
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <span>🎮 Educational</span>
          <span>•</span>
          <span>🔒 Learn Privacy</span>
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
            <li>• Digital privacy fundamentals</li>
            <li>• Why privacy matters in cryptocurrency</li>
            <li>• How to protect your personal information</li>
            <li>• Privacy vs. convenience trade-offs</li>
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
        <span>Play Privacy Jenga</span>
      </motion.button>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500">
        <p>⚠️ This is an educational game. No real Bitcoin rewards.</p>
        <p>🎮 Game hosted by mwangaza-lab.github.io</p>
      </div>
    </div>
  );
};

export default PrivacyJenga;
