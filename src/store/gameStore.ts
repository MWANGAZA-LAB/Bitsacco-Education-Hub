import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Game reward configurations
const GAME_REWARDS = {
  rollDice: { min: 5, max: 30 },
  drawEnvelope: { min: 10, max: 100 },
  watchVideo: { min: 25, max: 250 },
  satJoke: { min: 50, max: 50 },
  mondayMood: { min: 25, max: 75 },
  emojiChallenge: { min: 40, max: 40 },
  groupCount: { min: 5, max: 500 },
  hodlLetters: { min: 20, max: 20 }
};

// Cooldown durations in milliseconds (5 minutes)
const COOLDOWN_DURATION = 5 * 60 * 1000;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      setCurrentGame: (gameType) => {
        set({ currentGame: gameType });
      },

      setSavingsGoal: (targetKES, month) => {
        set({
          savingsGoal: { targetKES, month }
        });
      },

      updateSavingsProgress: (additionalKES) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            totalKESEarned: state.userProgress.totalKESEarned + additionalKES,
            totalGamesPlayed: state.userProgress.totalGamesPlayed + 1
          }
        }));
      },

      playGame: (gameType) => {
        set((state) => {
          const newPlayCount = state.gamePlayCounts[gameType] + 1;
          
          // Set cooldown for savings games only
          const isSavingsGame = ['rollDice', 'drawEnvelope', 'watchVideo', 'satJoke', 'mondayMood', 'emojiChallenge', 'groupCount', 'hodlLetters'].includes(gameType);
          const newCooldown = isSavingsGame ? Date.now() + COOLDOWN_DURATION : 0;
          
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
      },

      resetProgress: () => {
        set(createInitialState());
      },

      getGameStatus: (gameType) => {
        const state = get();
        const isUnlocked = state.unlockedGames.includes(gameType);
        const cooldownUntil = state.cooldowns[gameType] || 0;
        
        return {
          isUnlocked,
          cooldownUntil: cooldownUntil > Date.now() ? cooldownUntil : null
        };
      },

      getGamePlayCount: (gameType) => {
        const state = get();
        return state.gamePlayCounts[gameType] || 0;
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
