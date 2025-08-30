import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GAME_CONFIG } from '../config/gameConfig';
import { validation } from '../utils/validation';
import { logger } from '../utils/logger';

export type GameType = 'rollDice' | 'drawEnvelope' | 'watchVideo' | 'satJoke' | 'mondayMood' | 'emojiChallenge' | 'groupCount' | 'hodlLetters' | 'snakeSats' | 'privacyJenga';

export interface SavingsGoal {
  targetKES: number;
  month: 'september' | 'october' | 'november' | 'december';
}

export interface UserProgress {
  totalKESEarned: number;
  totalGamesPlayed: number;
  currentStreak: number;
  longestStreak: number;
  milestones: any[];
}

export interface GameStatus {
  isUnlocked: boolean;
  cooldownUntil: number | null;
}

interface GameStore {
  currentGame: GameType | null;
  unlockedGames: GameType[];
  gamePlayCounts: Record<GameType, number>;
  cooldowns: Record<GameType, number>;
  savingsGoal: SavingsGoal | null;
  userProgress: UserProgress;
  
  setCurrentGame: (gameType: GameType | null) => void;
  setSavingsGoal: (targetKES: number, month: 'september' | 'october' | 'november' | 'december') => void;
  updateSavingsProgress: (additionalKES: number) => void;
  playGame: (gameType: GameType) => void;
  resetProgress: () => void;
  getGameStatus: (gameType: GameType) => GameStatus;
  getGamePlayCount: (gameType: GameType) => number;
}

const createInitialState = () => ({
  currentGame: null,
  unlockedGames: ['rollDice', 'drawEnvelope', 'watchVideo', 'satJoke', 'mondayMood', 'emojiChallenge', 'groupCount', 'hodlLetters', 'snakeSats', 'privacyJenga'] as GameType[],
  gamePlayCounts: {
    rollDice: 0,
    drawEnvelope: 0,
    watchVideo: 0,
    satJoke: 0,
    mondayMood: 0,
    emojiChallenge: 0,
    groupCount: 0,
    hodlLetters: 0,
    snakeSats: 0,
    privacyJenga: 0
  },
  cooldowns: {
    rollDice: 0,
    drawEnvelope: 0,
    watchVideo: 0,
    satJoke: 0,
    mondayMood: 0,
    emojiChallenge: 0,
    groupCount: 0,
    hodlLetters: 0,
    snakeSats: 0,
    privacyJenga: 0
  },
  savingsGoal: null,
  userProgress: {
    totalKESEarned: 0,
    totalGamesPlayed: 0,
    currentStreak: 0,
    longestStreak: 0,
    milestones: []
  }
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      setCurrentGame: (gameType) => {
        try {
          if (gameType) {
            validation.gameType(gameType);
          }
          set({ currentGame: gameType });
          logger.info('Game selected', { gameType });
        } catch (error) {
          logger.error('Failed to set current game', { gameType, error: error instanceof Error ? error.message : String(error) });
        }
      },

      setSavingsGoal: (targetKES, month) => {
        try {
          validation.savingsGoal(targetKES, month);
          set({
            savingsGoal: { targetKES, month }
          });
          logger.info('Savings goal set', { targetKES, month });
        } catch (error) {
          logger.error('Failed to set savings goal', { targetKES, month, error: error instanceof Error ? error.message : String(error) });
          throw error; // Re-throw for UI handling
        }
      },

      updateSavingsProgress: (additionalKES) => {
        try {
          validation.kesAmount(additionalKES);
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              totalKESEarned: state.userProgress.totalKESEarned + additionalKES,
              totalGamesPlayed: state.userProgress.totalGamesPlayed + 1
            }
          }));
          logger.info('Progress updated', { additionalKES });
        } catch (error) {
          logger.error('Failed to update progress', { additionalKES, error: error instanceof Error ? error.message : String(error) });
        }
      },

      playGame: (gameType) => {
        try {
          validation.gameType(gameType);
          
          set((state) => {
            const newPlayCount = state.gamePlayCounts[gameType] + 1;
            
            // Set cooldown for savings games only
            const isSavingsGame = !GAME_CONFIG.educationalGames.includes(gameType as any);
            const newCooldown = isSavingsGame ? Date.now() + GAME_CONFIG.cooldownDuration : 0;
            
            return {
              gamePlayCounts: {
                ...state.gamePlayCounts,
                [gameType]: newPlayCount
              },
              cooldowns: {
                ...state.cooldowns,
                [gameType]: newCooldown
              },
              userProgress: {
                ...state.userProgress,
                totalGamesPlayed: state.userProgress.totalGamesPlayed + 1
              }
            };
          });
          
          logger.info('Game played', { gameType });
        } catch (error) {
          logger.error('Failed to play game', { gameType, error: error instanceof Error ? error.message : String(error) });
        }
      },

      resetProgress: () => {
        set(createInitialState());
        logger.info('Progress reset');
      },

      getGameStatus: (gameType) => {
        try {
          validation.gameType(gameType);
          const state = get();
          const isUnlocked = state.unlockedGames.includes(gameType);
          const cooldownUntil = state.cooldowns[gameType] || 0;
          
          return {
            isUnlocked,
            cooldownUntil: cooldownUntil > Date.now() ? cooldownUntil : null
          };
        } catch (error) {
          logger.error('Failed to get game status', { gameType, error: error instanceof Error ? error.message : String(error) });
          return { isUnlocked: false, cooldownUntil: null };
        }
      },

      getGamePlayCount: (gameType) => {
        try {
          validation.gameType(gameType);
          const state = get();
          return state.gamePlayCounts[gameType] || 0;
        } catch (error) {
          logger.error('Failed to get game play count', { gameType, error: error instanceof Error ? error.message : String(error) });
          return 0;
        }
      }
    }),
    {
      name: 'bitsacco-game-store',
      partialize: (state) => ({
        unlockedGames: state.unlockedGames,
        gamePlayCounts: state.gamePlayCounts,
        cooldowns: state.cooldowns,
        savingsGoal: state.savingsGoal,
        userProgress: state.userProgress
      })
    }
  )
);
