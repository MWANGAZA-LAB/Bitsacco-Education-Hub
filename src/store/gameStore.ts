import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  GameState, 
  GameType, 
  Game, 
  GameResult, 
  GAMES,
  STORAGE_KEYS,
  MONTH_CHALLENGES
} from '@/types';
import { 
  calculateKESEarned, 
  applyRewardScaling 
} from '@/utils/rewardCalculator';
import { 
  getNewMilestones
} from '@/utils/milestoneChecker';
import { 
  getCooldownStatus 
} from '@/utils/cooldownTimer';
import { 
  getSavingsProgress 
} from '@/utils/currencyConverter';
import { DEFAULT_MILESTONES } from '@/utils/milestoneChecker';

interface GameStore extends GameState {
  // Actions
  initializeGame: () => void;
  setCurrentGame: (gameType: GameType | null) => void;
  setSavingsGoal: (targetKES: number, month: 'september' | 'october' | 'november' | 'december') => void;
  updateSavingsProgress: (additionalKES: number) => void;
  playGame: (gameType: GameType) => GameResult;
  unlockNextGame: () => void;
  completeGame: (gameType: GameType) => void;
  resetProgress: () => void;
  getGameStatus: (gameType: GameType) => Game;
  getCooldownStatus: (gameType: GameType) => ReturnType<typeof getCooldownStatus>;
  getSavingsProgress: () => ReturnType<typeof getSavingsProgress>;
  getCurrentMonthChallenge: () => typeof MONTH_CHALLENGES[keyof typeof MONTH_CHALLENGES];
  getNextGameInLine: () => GameType | undefined;
  isGameOnCooldown: (gameType: GameType) => boolean;
  getGamePlayCount: (gameType: GameType) => number;
}

const getCurrentMonth = (): 'september' | 'october' | 'november' | 'december' => {
  const month = new Date().toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
  if (month === 'september' || month === 'october' || month === 'november' || month === 'december') {
    return month as 'september' | 'october' | 'november' | 'december';
  }
  return 'september';
};

const createInitialState = (): GameState => {
  return {
    currentGame: null,
    unlockedGames: ['rollDice', 'drawEnvelope', 'watchVideo', 'satJoke', 'mondayMood', 'emojiChallenge', 'groupCount', 'hodlLetters', 'snakeSats', 'privacyJenga'], // All games unlocked for testing
    completedGames: [],
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
         badges: [],
         milestones: DEFAULT_MILESTONES.map(milestone => ({
           ...milestone,
           isAchieved: false
         }))
       },
    lastUpdated: Date.now()
  };
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      initializeGame: () => {
        const state = get();
        if (!state.savingsGoal) {
          // Set default goal for current month
          const currentMonth = getCurrentMonth();
          const monthChallenge = MONTH_CHALLENGES[currentMonth];
          const defaultGoal = (monthChallenge.monthlyGoal.min + monthChallenge.monthlyGoal.max) / 2;
          
          set({
            savingsGoal: {
              targetKES: defaultGoal,
              currentKES: 0,
              startDate: Date.now(),
              endDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
              month: currentMonth
            }
          });
        }
      },

      setCurrentGame: (gameType: GameType | null) => {
        set({ currentGame: gameType });
      },

      setSavingsGoal: (targetKES: number, month: 'september' | 'october' | 'november' | 'december') => {
        set({
          savingsGoal: {
            targetKES,
            currentKES: 0,
            startDate: Date.now(),
            endDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
            month
          }
        });
      },

             updateSavingsProgress: (additionalKES: number) => {
         const state = get();
         if (!state.savingsGoal) return;

         const newCurrentKES = state.savingsGoal.currentKES + additionalKES;
         const newSavingsGoal = {
           ...state.savingsGoal,
           currentKES: newCurrentKES
         };

         // Check for new milestones
         const newMilestones = getNewMilestones(
           state.userProgress.milestones,
           newSavingsGoal,
           state.userProgress
         );

         const updatedMilestones = state.userProgress.milestones.map(milestone => {
           const newMilestone = newMilestones.find(nm => nm.id === milestone.id);
           return newMilestone || milestone;
         });

         set({
           savingsGoal: newSavingsGoal,
           userProgress: {
             ...state.userProgress,
             totalKESEarned: state.userProgress.totalKESEarned + additionalKES,
             milestones: updatedMilestones
           }
         });

         // Check if target is achieved
         if (newCurrentKES >= state.savingsGoal.targetKES) {
           // Trigger target achievement event
           const event = new CustomEvent('targetAchieved', {
             detail: {
               targetKES: state.savingsGoal.targetKES,
               currentKES: newCurrentKES,
               month: state.savingsGoal.month
             }
           });
           window.dispatchEvent(event);
         }
       },

      playGame: (gameType: GameType): GameResult => {
        const state = get();
        const game = GAMES[gameType];
        
        if (!game) {
          throw new Error(`Unknown game type: ${gameType}`);
        }

        // Check if game is unlocked (educational games are always available)
        if (game.category === 'savings' && !state.unlockedGames.includes(gameType)) {
          throw new Error(`Game ${gameType} is not unlocked yet`);
        }

        // Check cooldown (skip for educational games)
        if (game.category === 'savings') {
          const cooldownStatus = get().getCooldownStatus(gameType);
          if (cooldownStatus.isActive) {
            throw new Error(`Game ${gameType} is on cooldown until ${cooldownStatus.formattedTime}`);
          }
        }

                 // Calculate KES earned
         const baseKES = calculateKESEarned(gameType, state.savingsGoal);
         const scaledKES = applyRewardScaling(baseKES, state.savingsGoal?.month || 'september');
         
         // Update progress
         const newTotalKES = state.userProgress.totalKESEarned + scaledKES;
        const newTotalGames = state.userProgress.totalGamesPlayed + 1;
        
        // Update streak
        const today = new Date().toDateString();
        const lastPlayedDate = state.userProgress.lastPlayedDate 
          ? new Date(state.userProgress.lastPlayedDate).toDateString()
          : null;
        
        let newStreak = state.userProgress.currentStreak;
        if (lastPlayedDate === today) {
          // Already played today, maintain streak
        } else if (lastPlayedDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
          // Played yesterday, increment streak
          newStreak += 1;
        } else {
          // Break in streak, reset to 1
          newStreak = 1;
        }

        const newLongestStreak = Math.max(state.userProgress.longestStreak, newStreak);

                 // Update game play count (skip for educational games)
         const newGamePlayCounts = {
           ...state.gamePlayCounts,
           [gameType]: game.category === 'educational' 
             ? state.gamePlayCounts[gameType] || 0  // Don't increment for educational games
             : (state.gamePlayCounts[gameType] || 0) + 1
         };

         // Set cooldown for next game in line (5 minutes)
         let newCooldowns = state.cooldowns;
         if (game.category === 'savings') {
           const nextGame = get().getNextGameInLine();
           if (nextGame && nextGame !== gameType) {
             newCooldowns = {
               ...state.cooldowns,
               [nextGame]: Date.now() + (5 * 60 * 1000) // 5 minutes
             };
           }
         }

                 // Update state
         set({
           userProgress: {
             ...state.userProgress,
             totalKESEarned: newTotalKES,
             totalGamesPlayed: newTotalGames,
             currentStreak: newStreak,
             longestStreak: newLongestStreak,
             lastPlayedDate: Date.now()
           },
           gamePlayCounts: newGamePlayCounts,
           cooldowns: newCooldowns,
           lastUpdated: Date.now()
         });

         // Update savings progress for savings games
         if (game.category === 'savings' && scaledKES > 0) {
           get().updateSavingsProgress(scaledKES);
         }

         // Check for new milestones after game completion
         const newMilestones = getNewMilestones(
           state.userProgress.milestones,
           state.savingsGoal,
           {
             ...state.userProgress,
             totalKESEarned: newTotalKES,
             totalGamesPlayed: newTotalGames,
             currentStreak: newStreak,
             longestStreak: newLongestStreak
           }
         );

        if (newMilestones.length > 0) {
          set(state => ({
            userProgress: {
              ...state.userProgress,
              milestones: state.userProgress.milestones.map(milestone => {
                const newMilestone = newMilestones.find(nm => nm.id === milestone.id);
                return newMilestone || milestone;
              })
            }
          }));
        }

                 return {
           gameId: gameType,
           kesEarned: scaledKES,
           message: `You earned KES ${scaledKES.toLocaleString()} from ${game.name}!`,
           timestamp: Date.now(),
           passed: true
         };
      },

      unlockNextGame: () => {
        const state = get();
        const allGameTypes = Object.keys(GAMES) as GameType[];
        const currentUnlocked = state.unlockedGames;
        
        // Find next game to unlock
        const nextGame = allGameTypes.find(gameType => 
          !currentUnlocked.includes(gameType) && 
          GAMES[gameType].order === Math.max(...currentUnlocked.map(g => GAMES[g].order)) + 1
        );

        if (nextGame) {
          set({
            unlockedGames: [...currentUnlocked, nextGame]
          });
        }
      },

      completeGame: (gameType: GameType) => {
        const state = get();
        if (!state.completedGames.includes(gameType)) {
          set({
            completedGames: [...state.completedGames, gameType]
          });
        }
      },

      resetProgress: () => {
        set(createInitialState());
      },

             getGameStatus: (gameType: GameType): Game => {
         const state = get();
         const gameConfig = GAMES[gameType];
         const playCount = state.gamePlayCounts[gameType] || 0;
         
         // Educational games are always unlocked
         if (gameConfig.category === 'educational') {
           return {
             ...gameConfig,
             isUnlocked: true,
             isCompleted: false,
             cooldownUntil: 0
           };
         }
         
         // Check if game has been played 5 times
         const isMaxedOut = playCount >= 5;
         const isOnCooldown = state.cooldowns[gameType] > Date.now();
         
         // Game is unlocked if it's not maxed out and not on cooldown
         const isUnlocked = !isMaxedOut && !isOnCooldown;
         const isCompleted = isMaxedOut;

         return {
           ...gameConfig,
           isUnlocked,
           isCompleted,
           cooldownUntil: state.cooldowns[gameType]
         };
       },

      getCooldownStatus: (gameType: GameType) => {
        const state = get();
        return getCooldownStatus(gameType, state.cooldowns);
      },

      getSavingsProgress: () => {
        const state = get();
        if (!state.savingsGoal) {
          return {
            kesProgress: 0,
            satsProgress: 0,
            kesRemaining: 0,
            satsRemaining: 0,
            percentage: 0
          };
        }
        return getSavingsProgress(state.savingsGoal.currentKES, state.savingsGoal.targetKES);
      },

             getCurrentMonthChallenge: () => {
         const currentMonth = getCurrentMonth();
         return MONTH_CHALLENGES[currentMonth];
       },

       // New cooldown management functions
       getNextGameInLine: () => {
         const state = get();
         const savingsGames = Object.keys(GAMES).filter(gameType => 
           GAMES[gameType as GameType].category === 'savings'
         ) as GameType[];
         
         // Find the next game that hasn't been played 5 times yet
         return savingsGames.find(gameType => 
           state.gamePlayCounts[gameType] < 5
         );
       },

       isGameOnCooldown: (gameType: GameType) => {
         const state = get();
         const cooldownEnd = state.cooldowns[gameType];
         return cooldownEnd > Date.now();
       },

       getGamePlayCount: (gameType: GameType) => {
         const state = get();
         return state.gamePlayCounts[gameType] || 0;
       }
    }),
         {
       name: STORAGE_KEYS.GAME_STATE,
       partialize: (state) => ({
         unlockedGames: state.unlockedGames,
         completedGames: state.completedGames,
         gamePlayCounts: state.gamePlayCounts,
         cooldowns: state.cooldowns,
         savingsGoal: state.savingsGoal,
         userProgress: state.userProgress,
         lastUpdated: state.lastUpdated
       })
     }
  )
);
