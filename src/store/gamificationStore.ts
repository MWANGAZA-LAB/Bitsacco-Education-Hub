import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  UserProgress, 
  GamificationLevel, 
  Badge, 
  LeaderboardEntry,
  DailyReminder 
} from '../types/gamification';
import { gamificationLevels, badges, dailyReminders } from '../data/gamificationData';

interface GamificationState {
  // User Progress
  userProgress: UserProgress;
  
  // Game State
  currentLevel: number;
  currentLesson: string | null;
  levels: GamificationLevel[];
  userBadges: Badge[];
  
  // Streak & XP
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  dailyGoal: number;
  dailyProgress: number;
  
  // Completed Lessons
  completedLessons: string[];
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  
  // Daily Reminders
  dailyReminders: DailyReminder[];
  lastReminderDate: string;
  
  // Actions
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  unlockLevel: (levelId: number) => void;
  earnBadge: (badgeId: string) => void;
  updateStreak: () => void;
  addXP: (amount: number) => void;
  setDailyGoal: (goal: number) => void;
  updateDailyProgress: (progress: number) => void;
  showDailyReminder: () => DailyReminder | null;
  resetProgress: () => void;
}

const getInitialUserProgress = (): UserProgress => ({
  currentLevel: 1,
  currentLesson: null,
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastLessonDate: '',
  badges: [],
  completedLessons: [],
  dailyGoal: 1,
  dailyProgress: 0
});

const getInitialLevels = (): GamificationLevel[] => {
  return gamificationLevels.map(level => ({
    ...level,
    unlocked: level.id === 1,
    completed: false,
    progress: 0,
    lessons: level.lessons.map(lesson => ({
      ...lesson,
      completed: false
    }))
  }));
};

const getInitialBadges = (): Badge[] => {
  return badges.map(badge => ({
    ...badge,
    unlocked: false
  }));
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      // Initial State
      userProgress: getInitialUserProgress(),
      currentLevel: 1,
      currentLesson: null,
      levels: getInitialLevels(),
      userBadges: getInitialBadges(),
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      dailyGoal: 1,
      dailyProgress: 0,
      completedLessons: [],
      leaderboard: [],
      dailyReminders: dailyReminders.map((message, index) => ({
        id: `reminder-${index}`,
        message,
        emoji: message.match(/[^\u0000-\u007F]/g)?.join('') || '💰',
        type: 'motivation' as const,
        shown: false,
        showDate: new Date().toISOString()
      })),
      lastReminderDate: new Date().toDateString(),

      // Actions
      startLesson: (lessonId: string) => {
        set({ currentLesson: lessonId });
      },

      completeLesson: (lessonId: string, xpEarned: number) => {
        const { levels, userProgress, currentStreak, longestStreak, totalXP } = get();
        
        // Update levels and lessons
        const updatedLevels = levels.map(level => ({
          ...level,
          lessons: level.lessons.map(lesson => 
            lesson.id === lessonId 
              ? { ...lesson, completed: true }
              : lesson
          )
        }));

        // Update level progress
        const updatedLevelsWithProgress = updatedLevels.map(level => {
          const completedLessons = level.lessons.filter(l => l.completed).length;
          const totalLessons = level.lessons.length;
          const progress = (completedLessons / totalLessons) * 100;
          
          return {
            ...level,
            progress,
            completed: progress === 100
          };
        });

        // Check if level is completed and unlock next level
        const currentLevel = updatedLevelsWithProgress.find(l => l.id === get().currentLevel);
        if (currentLevel?.completed) {
          const nextLevel = updatedLevelsWithProgress.find(l => l.id === get().currentLevel + 1);
          if (nextLevel) {
            nextLevel.unlocked = true;
          }
        }

        // Update user progress
        const newTotalXP = totalXP + xpEarned;
        const newCurrentStreak = currentStreak + 1;
        const newLongestStreak = Math.max(longestStreak, newCurrentStreak);
        
        const updatedUserProgress: UserProgress = {
          ...userProgress,
          totalXP: newTotalXP,
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastLessonDate: new Date().toISOString(),
          completedLessons: [...userProgress.completedLessons, lessonId],
          dailyProgress: userProgress.dailyProgress + 1
        };

        // Check for badge unlocks
        const updatedBadges = get().userBadges.map(badge => {
          if (badge.unlocked) return badge;
          
          let shouldUnlock = false;
          switch (badge.id) {
            case 'beginner-saver':
              shouldUnlock = updatedUserProgress.completedLessons.length >= 1;
              break;
            case 'bitcoin-explorer':
              shouldUnlock = updatedLevelsWithProgress.find(l => l.id === 2)?.completed || false;
              break;
            case 'goal-setter':
              shouldUnlock = true; // This would be set when user actually sets a goal
              break;
            case 'streak-master':
              shouldUnlock = newCurrentStreak >= 7;
              break;
            case 'bitsacco-pioneer':
              shouldUnlock = updatedLevelsWithProgress.find(l => l.id === 4)?.completed || false;
              break;
            case 'community-hero':
              shouldUnlock = updatedLevelsWithProgress.every(l => l.completed);
              break;
          }
          
          if (shouldUnlock) {
            return {
              ...badge,
              unlocked: true,
              unlockedDate: new Date().toISOString()
            };
          }
          return badge;
        });

        set({
          levels: updatedLevelsWithProgress,
          userProgress: updatedUserProgress,
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          totalXP: newTotalXP,
          userBadges: updatedBadges,
          currentLesson: null
        });
      },

      unlockLevel: (levelId: number) => {
        const { levels } = get();
        const updatedLevels = levels.map(level => 
          level.id === levelId 
            ? { ...level, unlocked: true }
            : level
        );
        set({ levels: updatedLevels, currentLevel: levelId });
      },

      earnBadge: (badgeId: string) => {
        const { userBadges } = get();
        const updatedBadges = userBadges.map(badge => 
          badge.id === badgeId 
            ? { ...badge, unlocked: true, unlockedDate: new Date().toISOString() }
            : badge
        );
        set({ userBadges: updatedBadges });
      },

      updateStreak: () => {
        const { userProgress } = get();
        const today = new Date().toDateString();
        const lastLesson = new Date(userProgress.lastLessonDate).toDateString();
        
        if (today !== lastLesson) {
          // Check if it's been more than one day
          const daysDiff = Math.ceil((new Date().getTime() - new Date(userProgress.lastLessonDate).getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysDiff > 1) {
            // Streak broken
            set({ currentStreak: 0 });
          }
        }
      },

      addXP: (amount: number) => {
        const { totalXP } = get();
        set({ totalXP: totalXP + amount });
      },

      setDailyGoal: (goal: number) => {
        set({ dailyGoal: goal });
      },

      updateDailyProgress: (progress: number) => {
        set({ dailyProgress: progress });
      },

      showDailyReminder: () => {
        const { dailyReminders, lastReminderDate } = get();
        const today = new Date().toDateString();
        
        if (today !== lastReminderDate) {
          // Show a random reminder
          const availableReminders = dailyReminders.filter(r => !r.shown);
          if (availableReminders.length > 0) {
            const randomReminder = availableReminders[Math.floor(Math.random() * availableReminders.length)];
            
            // Mark as shown
            const updatedReminders = dailyReminders.map(r => 
              r.id === randomReminder.id 
                ? { ...r, shown: true, showDate: today }
                : r
            );
            
            set({ 
              dailyReminders: updatedReminders, 
              lastReminderDate: today 
            });
            
            return randomReminder;
          }
        }
        
        return null;
      },

      resetProgress: () => {
        set({
          userProgress: getInitialUserProgress(),
          currentLevel: 1,
          currentLesson: null,
          levels: getInitialLevels(),
          userBadges: getInitialBadges(),
          currentStreak: 0,
          longestStreak: 0,
          totalXP: 0,
          dailyGoal: 1,
          dailyProgress: 0,
          completedLessons: []
        });
      }
    }),
    {
      name: 'bitsacco-gamification-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        currentLevel: state.currentLevel,
        levels: state.levels,
        userBadges: state.userBadges,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        totalXP: state.totalXP,
        dailyGoal: state.dailyGoal,
        dailyProgress: state.dailyProgress,
        completedLessons: state.completedLessons,
        lastReminderDate: state.lastReminderDate
      })
    }
  )
);
