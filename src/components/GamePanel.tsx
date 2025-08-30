import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAMES } from '../types';

// Import all savings games
import RollDice from '../games/savings/RollDice';
import DrawEnvelope from '../games/savings/DrawEnvelope';
import WatchVideo from '../games/savings/WatchVideo';
import SatJoke from '../games/savings/SatJoke';
import MondayMood from '../games/savings/MondayMood';
import EmojiChallenge from '../games/savings/EmojiChallenge';
import GroupCount from '../games/savings/GroupCount';
import HodlLetters from '../games/savings/HodlLetters';

const GamePanel: React.FC = () => {
  const { currentGame, playGame, getGameStatus, getGamePlayCount, updateSavingsProgress, setCurrentGame } = useGameStore();
  const [iframeLoaded, setIframeLoaded] = useState<{[key: string]: boolean}>({});

  // Auto-load iframe for educational games
  useEffect(() => {
    if (currentGame === 'snakeSats' || currentGame === 'privacyJenga') {
      setIframeLoaded(prev => ({ ...prev, [currentGame]: false }));
    }
  }, [currentGame]);



  const handleGameComplete = (kesEarned: number) => {
    updateSavingsProgress(kesEarned);
    playGame(currentGame!);
  };

  const handleReturnToGames = () => {
    setCurrentGame(null);
  };

  const handleGoToEducation = () => {
    // This could be implemented to show education content
    console.log('Go to education');
  };

  if (!currentGame) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Game Hub
          </h2>
          <p className="text-gray-300 text-lg">Select a game from the menu to start your savings journey!</p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm text-gray-400">Earn KES</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-gray-400">Hit Targets</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <p className="text-sm text-gray-400">Keep Saving</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const game = GAMES[currentGame];
  const status = getGameStatus(currentGame);
  const playCount = getGamePlayCount(currentGame);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-8 shadow-xl border border-gray-700">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 lg:mb-8">
        <div className="bg-gray-700 rounded-xl p-3 lg:p-4 shadow-lg self-start lg:self-auto">
          <span className="text-3xl lg:text-4xl">{game.icon}</span>
        </div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {game.name}
          </h2>
          <p className="text-gray-300 text-base lg:text-lg mt-1">{game.description}</p>
        </div>
      </div>

      {/* Game Status - Only for savings games */}
      {(currentGame !== 'snakeSats' && currentGame !== 'privacyJenga') && (
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Game Status</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-1">Status</p>
              <p className={`text-lg font-bold ${
                status.isUnlocked ? 'text-green-400' : 'text-red-400'
              }`}>
                {status.isUnlocked ? '✅ Available' : '🔒 Locked'}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-1">Times Played</p>
              <p className="text-lg font-bold text-white">{playCount}/5</p>
            </div>
            {status.cooldownUntil && status.cooldownUntil > Date.now() && (
              <div className="col-span-2 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm font-medium mb-1">⏰ Cooldown Active</p>
                <p className="text-yellow-300 font-bold">
                  {Math.ceil((status.cooldownUntil - Date.now()) / 1000 / 60)} minutes remaining
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Interface */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-8 mb-6 shadow-lg border border-gray-600">
        {(currentGame !== 'snakeSats' && currentGame !== 'privacyJenga') && (
          <h3 className="text-xl font-bold mb-6 text-gray-200">🎮 Game Interface</h3>
        )}
        
        {currentGame === 'snakeSats' && (
          <div className="text-center">
            <p className="text-sm text-blue-400 mb-4">Pro Tip: Read the in-game Bitcoin tips!</p>
            <p className="text-xs text-gray-500 mb-2">💡 Click on the game area to focus • Use arrow keys or touch to play</p>
            <div 
              className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden relative cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              tabIndex={0}
              onClick={() => {
                const iframe = document.querySelector('iframe[title="SnakeSats Game"]') as HTMLIFrameElement;
                if (iframe) iframe.focus();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const iframe = document.querySelector('iframe[title="SnakeSats Game"]') as HTMLIFrameElement;
                  if (iframe) iframe.focus();
                }
              }}
            >
              {!iframeLoaded['snakeSats'] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-400">Loading SnakeSats...</p>
                  </div>
                </div>
              )}
              <iframe
                src="https://mwangaza-lab.github.io/snakesats/"
                className="w-full h-full border-0 focus:outline-none"
                title="SnakeSats Game"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                onLoad={() => {
                  setIframeLoaded(prev => ({ ...prev, snakeSats: true }));
                  setTimeout(() => {
                    const iframe = document.querySelector('iframe[title="SnakeSats Game"]') as HTMLIFrameElement;
                    if (iframe) iframe.focus();
                  }, 100);
                }}
                onFocus={() => {
                  const iframe = document.querySelector('iframe[title="SnakeSats Game"]') as HTMLIFrameElement;
                  if (iframe) iframe.focus();
                }}
              />
            </div>
          </div>
        )}
        
        {currentGame === 'privacyJenga' && (
          <div className="text-center">
            <p className="text-sm text-blue-400 mb-4">Pro Tip: Read the in-game privacy tips!</p>
            <p className="text-xs text-gray-500 mb-2">💡 Click on the game area to focus • Use mouse/touch to play</p>
            <div 
              className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden relative cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              tabIndex={0}
              onClick={() => {
                const iframe = document.querySelector('iframe[title="Privacy Jenga Game"]') as HTMLIFrameElement;
                if (iframe) iframe.focus();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const iframe = document.querySelector('iframe[title="Privacy Jenga Game"]') as HTMLIFrameElement;
                  if (iframe) iframe.focus();
                }
              }}
            >
              {!iframeLoaded['privacyJenga'] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-400">Loading Privacy Jenga...</p>
                  </div>
                </div>
              )}
              <iframe
                src="https://mwangaza-lab.github.io/Privacy-Jenga/"
                className="w-full h-full border-0 focus:outline-none"
                title="Privacy Jenga Game"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                onLoad={() => {
                  setIframeLoaded(prev => ({ ...prev, privacyJenga: true }));
                  setTimeout(() => {
                    const iframe = document.querySelector('iframe[title="Privacy Jenga Game"]') as HTMLIFrameElement;
                    if (iframe) iframe.focus();
                  }, 100);
                }}
                onFocus={() => {
                  const iframe = document.querySelector('iframe[title="Privacy Jenga Game"]') as HTMLIFrameElement;
                  if (iframe) iframe.focus();
                }}
              />
            </div>
          </div>
        )}
        
        {/* Render actual savings games */}
        {currentGame === 'rollDice' && (
          <RollDice 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'drawEnvelope' && (
          <DrawEnvelope 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'watchVideo' && (
          <WatchVideo 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'satJoke' && (
          <SatJoke 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'mondayMood' && (
          <MondayMood 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'emojiChallenge' && (
          <EmojiChallenge 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'groupCount' && (
          <GroupCount 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
        
        {currentGame === 'hodlLetters' && (
          <HodlLetters 
            onComplete={handleGameComplete}
            onReturnToGames={handleReturnToGames}
            onGoToEducation={handleGoToEducation}
          />
        )}
      </div>
    </div>
  );
};

export default GamePanel;
