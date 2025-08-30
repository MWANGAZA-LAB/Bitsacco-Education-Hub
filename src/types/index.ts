// Core game types and interfaces for Bitsacco Ember Savings Game Hub

export type GameType = 
  | 'rollDice'
  | 'drawEnvelope' 
  | 'watchVideo'
  | 'satJoke'
  | 'mondayMood'
  | 'emojiChallenge'
  | 'groupCount'
  | 'hodlLetters'
  | 'snakeSats'
  | 'privacyJenga';

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

export const MONTH_CHALLENGES: Record<string, MonthChallenge> = {
  september: {
    month: 'september',
    dailyTarget: 50,
    monthlyGoal: { min: 1500, max: 2000 },
    bonus: 'Foundation building',
    theme: 'Getting started'
  },
  october: {
    month: 'october', 
    dailyTarget: 100,
    monthlyGoal: { min: 3000, max: 4000 },
    bonus: '+500 KES side income bonus',
    theme: 'Step it up'
  },
  november: {
    month: 'november',
    dailyTarget: 150, 
    monthlyGoal: { min: 4500, max: 5000 },
    bonus: 'Accountability groups',
    theme: 'No excuses'
  },
  december: {
    month: 'december',
    dailyTarget: 200,
    monthlyGoal: { min: 6000, max: 7000 }, 
    bonus: 'Festive rewards',
    theme: 'Festive goal'
  }
};

// Game configurations
export const GAMES: Record<GameType, Omit<Game, 'isUnlocked' | 'isCompleted' | 'cooldownUntil'>> = {
  rollDice: {
    id: 'rollDice',
    name: 'Roll Dice',
    description: 'Roll a dice and earn KES 5-30',
    category: 'savings',
    icon: '🎲',
    minKES: 5,
    maxKES: 30,
    order: 1
  },
  drawEnvelope: {
    id: 'drawEnvelope',
    name: 'Draw Envelope',
    description: 'Draw an envelope and earn KES 10-100',
    category: 'savings',
    icon: '✉️',
    minKES: 10,
    maxKES: 100,
    order: 2
  },
  watchVideo: {
    id: 'watchVideo',
    name: 'Watch Video',
    description: 'Watch a Bitcoin video and earn KES 25-250',
    category: 'savings',
    icon: '🎥',
    minKES: 25,
    maxKES: 250,
    order: 3
  },
  satJoke: {
    id: 'satJoke',
    name: 'Sat Joke',
    description: 'Rate a Bitcoin joke and earn KES 50',
    category: 'savings',
    icon: '😂',
    minKES: 50,
    maxKES: 50,
    order: 4
  },
  mondayMood: {
    id: 'mondayMood',
    name: 'Monday Mood',
    description: 'Share your Monday mood and earn KES 25-75',
    category: 'savings',
    icon: '🌞',
    minKES: 25,
    maxKES: 75,
    order: 5
  },
  emojiChallenge: {
    id: 'emojiChallenge',
    name: 'Emoji Challenge',
    description: 'Choose your favorite emoji and earn KES 40',
    category: 'savings',
    icon: '🔥',
    minKES: 40,
    maxKES: 40,
    order: 6
  },
  groupCount: {
    id: 'groupCount',
    name: 'Group Count',
    description: 'Count your group and earn KES 5-500',
    category: 'savings',
    icon: '👥',
    minKES: 5,
    maxKES: 500,
    order: 7
  },
  hodlLetters: {
    id: 'hodlLetters',
    name: 'HODL Letters',
    description: 'Find HODL letters and earn KES 20',
    category: 'savings',
    icon: '🟠',
    minKES: 20,
    maxKES: 20,
    order: 8
  },
  snakeSats: {
    id: 'snakeSats',
    name: 'Snake Sats',
    description: 'Learn Bitcoin through Snake game',
    category: 'educational',
    icon: '🐍',
    minKES: 0,
    maxKES: 0,
    order: 9
  },
  privacyJenga: {
    id: 'privacyJenga',
    name: 'Privacy Jenga',
    description: 'Learn about privacy through Jenga',
    category: 'educational',
    icon: '🧩',
    minKES: 0,
    maxKES: 0,
    order: 10
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
