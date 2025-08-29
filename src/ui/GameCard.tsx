import React from 'react';
import { motion } from 'framer-motion';
import { GameType, Game } from '@/types';
import { Lock, Clock, CheckCircle } from 'lucide-react';

interface GameCardProps {
  gameType: GameType;
  game: Game;
  isSelected: boolean;
  isUnlocked: boolean;
  isOnCooldown: boolean;
  isCompleted: boolean;
  cooldownProgress?: number;
  cooldownTime?: string;
  onClick: (gameType: GameType) => void;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({
  gameType,
  game,
  isSelected,
  isUnlocked,
  isOnCooldown,
  isCompleted,
  cooldownProgress = 0,
  cooldownTime = '',
  onClick,
  index
}) => {
  const getCardClass = () => {
    let baseClass = 'game-card';
    
    if (!isUnlocked) {
      baseClass += ' locked';
    } else if (isOnCooldown) {
      baseClass += ' on-cooldown';
    }
    
    if (isSelected) {
      baseClass += ' ring-2 ring-bitsacco-500';
    }
    
    return baseClass;
  };

  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="w-4 h-4 text-savings-500" />;
    }
    
    if (!isUnlocked) {
      return <Lock className="w-4 h-4 text-gray-500" />;
    }
    
    if (isOnCooldown) {
      return <Clock className="w-4 h-4 text-bitcoin-500" />;
    }
    
    return null;
  };

  const getStatusText = () => {
    if (isCompleted) {
      return 'Completed';
    }
    
    if (!isUnlocked) {
      return 'Locked';
    }
    
    if (isOnCooldown) {
      return cooldownTime;
    }
    
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isCompleted) {
      return 'text-savings-500';
    }
    
    if (!isUnlocked) {
      return 'text-gray-500';
    }
    
    if (isOnCooldown) {
      return 'text-bitcoin-500';
    }
    
    return 'text-bitsacco-500';
  };

  const handleClick = () => {
    if (isUnlocked && !isOnCooldown) {
      onClick(gameType);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div
        className={`${getCardClass()} p-4 md:p-6 min-h-[80px]`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Play ${game.name}`}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="text-2xl md:text-3xl flex-shrink-0">{game.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm md:text-base truncate">{game.name}</h3>
              <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{game.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
                {getStatusIcon()}
              </div>
            </div>
          </div>
          
                     <div className="text-right flex-shrink-0 ml-2">
             <div className="text-xs md:text-sm font-medium text-bitcoin-500">
               {game.category === 'educational' ? 'Learn' : `KES ${game.minKES.toLocaleString()}-${game.maxKES.toLocaleString()}`}
             </div>
             <div className="text-xs text-gray-500 capitalize">
               {game.category}
             </div>
           </div>
        </div>
        
        {/* Progress indicator for cooldown */}
        {isOnCooldown && (
          <div className="mt-3">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${cooldownProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
