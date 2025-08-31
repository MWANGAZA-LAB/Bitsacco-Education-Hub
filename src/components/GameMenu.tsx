import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { GameType, GAMES } from '../types';

const GameMenu: React.FC = () => {
  const { currentGame, setCurrentGame, getGameStatus, getGamePlayCount } = useGameStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['savings']));

  const gameCategories = {
    savings: {
      title: 'Savings Games',
      icon: '💰',
      games: ['rollDice', 'drawEnvelope', 'watchVideo'] as GameType[]
    },
    education: {
      title: 'Educational Games',
      icon: '📚',
      games: ['privacyJenga'] as GameType[]
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getGameIcon = (gameType: GameType) => {
    const game = GAMES[gameType];
    return game?.icon || '🎮';
  };

  const getGameStatusColor = (gameType: GameType) => {
    const status = getGameStatus(gameType);
    const playCount = getGamePlayCount(gameType);
    
    if (gameType === 'privacyJenga') {
      return 'text-green-400'; // Educational games always available
    }
    
    if (playCount >= 5) {
      return 'text-gray-500'; // Maxed out
    }
    
    if (!status.isUnlocked) {
      return 'text-red-400'; // Locked
    }
    
    if (status.cooldownUntil && status.cooldownUntil > Date.now()) {
      return 'text-yellow-400'; // On cooldown
    }
    
    return 'text-green-400'; // Available
  };

  return (
    <div className="bg-gray-800 rounded-lg p-3 lg:p-4">
      <h2 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Games</h2>
      
      {Object.entries(gameCategories).map(([categoryKey, category]) => (
        <div key={categoryKey} className="mb-3 lg:mb-4">
          <button
            onClick={() => toggleCategory(categoryKey)}
            className="w-full flex items-center justify-between p-2 lg:p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg lg:text-xl">{category.icon}</span>
              <span className="font-medium text-white text-sm lg:text-base">{category.title}</span>
            </div>
            <span className="text-white">
              {expandedCategories.has(categoryKey) ? '▼' : '▶'}
            </span>
          </button>
          
          {expandedCategories.has(categoryKey) && (
            <div className="mt-2 space-y-1">
              {category.games.map((gameType) => {
                const status = getGameStatus(gameType);
                const playCount = getGamePlayCount(gameType);
                const isActive = currentGame === gameType;
                
                return (
                                     <button
                     key={gameType}
                     onClick={() => setCurrentGame(gameType)}
                     disabled={!status.isUnlocked}
                     className={`w-full flex items-center justify-between p-2 lg:p-3 rounded text-left transition-colors ${
                       isActive 
                         ? 'bg-orange-600 text-white' 
                         : !status.isUnlocked 
                         ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                         : 'bg-gray-700 hover:bg-gray-600 text-white'
                     }`}
                   >
                     <div className="flex items-center space-x-2">
                       <span className="text-base lg:text-lg">{getGameIcon(gameType)}</span>
                       <span className="font-medium text-sm lg:text-base">{GAMES[gameType].name}</span>
                     </div>
                     
                     <div className="flex items-center space-x-2">
                       {/* Only show play count for savings games */}
                       {gameType !== 'privacyJenga' && playCount > 0 && (
                         <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                           {playCount}/5
                         </span>
                       )}
                       <span className={`text-sm ${getGameStatusColor(gameType)}`}>
                         {status.cooldownUntil && status.cooldownUntil > Date.now() ? '⏰' : !status.isUnlocked ? '🔒' : '✅'}
                       </span>
                     </div>
                   </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameMenu;
