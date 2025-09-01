// Core game types and interfaces for Bitsacco Ember Savings Game Hub

export type GameType = 
  | 'rollDice'
  | 'drawEnvelope' 
  | 'watchVideo'
  | 'privacyJenga'
  | 'dashboard';

export type GameCategory = 'savings' | 'educational';

export interface Game {
  id: GameType;
  name: string;
  description: string;
  category: GameCategory;
  icon: string;
  minKES: number;
  maxKES: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  cooldownUntil?: number;
  order: number;
}

export interface GameResult {
  gameId: GameType;
  kesEarned: number;
  message: string;
  timestamp: number;
  passed: boolean;
}

export interface SavingsGoal {
  targetKES: number;
  currentKES: number;
  startDate: number;
  endDate: number;
  month: 'september' | 'october' | 'november' | 'december';
}

export interface Milestone {
  id: string;
  percentage: number;
  title: string;
  description: string;
  isAchieved: boolean;
  achievedAt?: number;
  reward?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: number;
  category: 'savings' | 'streak' | 'achievement' | 'special';
}

export interface UserProgress {
  totalKESEarned: number;
  totalGamesPlayed: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate?: number;
  badges: Badge[];
  milestones: Milestone[];
}

export interface GameState {
  currentGame: GameType | null;
  unlockedGames: GameType[];
  completedGames: GameType[];
  gamePlayCounts: Record<GameType, number>;
  cooldowns: Record<GameType, number>;
  savingsGoal: SavingsGoal | null;
  userProgress: UserProgress;
  lastUpdated: number;
}

// Challenge month configurations
export interface MonthChallenge {
  month: 'september' | 'october' | 'november' | 'december';
  dailyTarget: number;
  monthlyGoal: {
    min: number;
    max: number;
  };
  bonus: string;
  theme: string;
}

// MONTH_CHALLENGES moved to gameConfig.ts to avoid duplication

// Game configurations
export const GAMES: Record<GameType, Omit<Game, 'isUnlocked' | 'isCompleted' | 'cooldownUntil'>> = {
  rollDice: {
    id: 'rollDice',
    name: 'Investment Risk Simulator',
    description: 'Learn investment risk management through real scenarios',
    category: 'savings',
    icon: '📊',
    minKES: 5,
    maxKES: 50,
    order: 1
  },
  drawEnvelope: {
    id: 'drawEnvelope',
    name: 'Emergency Fund Builder',
    description: 'Learn emergency fund importance through real scenarios',
    category: 'savings',
    icon: '🏥',
    minKES: 5,
    maxKES: 100,
    order: 2
  },
  watchVideo: {
    id: 'watchVideo',
    name: 'Interactive Learning Hub',
    description: 'Learn Bitcoin through videos, quizzes, and actionable tasks',
    category: 'savings',
    icon: '📚',
    minKES: 25,
    maxKES: 150,
    order: 3
  },
  privacyJenga: {
    id: 'privacyJenga',
    name: 'Privacy Jenga',
    description: 'Learn about privacy through Jenga',
    category: 'educational',
    icon: '🧩',
    minKES: 0,
    maxKES: 0,
    order: 4
  },
  dashboard: {
    id: 'dashboard',
    name: 'Personal Dashboard',
    description: 'Track your financial progress and goals',
    category: 'savings',
    icon: '📊',
    minKES: 0,
    maxKES: 0,
    order: 5
  }
};

// Utility types
export type Currency = 'KES' | 'SATS';
export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

export interface CooldownConfig {
  duration: number;
  unit: TimeUnit;
}

export interface RewardConfig {
  baseSats: number;
  bonusPercentage: number;
  maxBonus: number;
}

// Local storage keys
export const STORAGE_KEYS = {
  GAME_STATE: 'bitsacco_game_state',
  SAVINGS_GOAL: 'bitsacco_savings_goal',
  USER_PROGRESS: 'bitsacco_user_progress',
  SETTINGS: 'bitsacco_settings',
  COOLDOWNS: 'bitsacco_cooldowns'
} as const;

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

// Accessibility types
export interface AccessibilityConfig {
  ariaLabel: string;
  ariaDescription?: string;
  keyboardShortcut?: string;
}
