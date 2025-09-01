export interface GamificationLevel {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  lessons: GamificationLesson[];
  requiredXP: number;
  unlocked: boolean;
  completed: boolean;
  progress: number;
}

export interface GamificationLesson {
  id: string;
  title: string;
  content: string;
  type: 'quiz' | 'drag-drop' | 'multiple-choice' | 'mini-game' | 'input' | 'matching';
  questions: LessonQuestion[];
  xpReward: number;
  completed: boolean;
  streakBonus: number;
  emoji: string;
  funnyMessage: string;
}

export interface LessonQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'matching' | 'input';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  emoji: string;
}

export interface UserProgress {
  currentLevel: number;
  currentLesson: string | null;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastLessonDate: string;
  badges: Badge[];
  completedLessons: string[];
  dailyGoal: number;
  dailyProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
  requirement: string;
  emoji: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLessonDate: string;
  streakStartDate: string;
  dailyGoal: number;
  dailyProgress: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  rank: number;
}

export interface DailyReminder {
  id: string;
  message: string;
  emoji: string;
  type: 'motivation' | 'streak' | 'achievement' | 'funny';
  shown: boolean;
  showDate: string;
}
