import { useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { GameType } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

export const useGame = (gameType: GameType) => {
  const { playGame, getGameStatus, getGamePlayCount, updateSavingsProgress } = useGameStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const status = useMemo(() => getGameStatus(gameType), [gameType, getGameStatus]);
  const playCount = useMemo(() => getGamePlayCount(gameType), [gameType, getGamePlayCount]);
  
  const isEducationalGame = useMemo(() => 
    GAME_CONFIG.educationalGames.includes(gameType as any), 
    [gameType]
  );

  const handlePlayGame = useCallback(async () => {
    if (!gameType || isEducationalGame) return;
    
    setIsPlaying(true);
    try {
      // Simulate game play
      await new Promise(resolve => setTimeout(resolve, 1000));
      playGame(gameType);
    } catch (error) {
      console.error('Game play failed:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [gameType, isEducationalGame, playGame]);

  const handleGameComplete = useCallback((kesEarned: number) => {
    updateSavingsProgress(kesEarned);
    playGame(gameType);
  }, [gameType, updateSavingsProgress, playGame]);

  return {
    isPlaying,
    status,
    playCount,
    isEducationalGame,
    handlePlayGame,
    handleGameComplete
  };
};
