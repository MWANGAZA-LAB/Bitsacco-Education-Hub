import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Zap, 
  Clock, 
  CheckCircle,
  X,
  Bell
} from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { DailyReminder as DailyReminderType } from '../../types/gamification';

// Mock daily reminders data
const mockDailyReminders: DailyReminderType[] = [
  {
    id: 'reminder-1',
    message: 'Time to learn something new! 🚀',
    emoji: '🚀',
    type: 'motivation',
    shown: false,
    showDate: ''
  },
  {
    id: 'reminder-2',
    message: 'Your streak is on fire! Keep it up! 🔥',
    emoji: '🔥',
    type: 'streak',
    shown: false,
    showDate: ''
  },
  {
    id: 'reminder-3',
    message: 'Every lesson brings you closer to financial freedom! 💰',
    emoji: '💰',
    type: 'achievement',
    shown: false,
    showDate: ''
  }
];

const DailyReminder: React.FC = () => {
  const { currentStreak, totalXP, dailyGoal, dailyProgress } = useGamificationStore();
  const [showReminder, setShowReminder] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<DailyReminderType | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if we should show a reminder
    const lastShown = localStorage.getItem('lastReminderShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Show a random reminder
      const availableReminders = mockDailyReminders.filter(r => !r.shown);
      if (availableReminders.length > 0) {
        const randomReminder = availableReminders[Math.floor(Math.random() * availableReminders.length)];
        setCurrentReminder(randomReminder);
        setShowReminder(true);
        localStorage.setItem('lastReminderShown', today);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowReminder(false);
    if (currentReminder) {
      // Mark as shown
      // In a real app, this would be saved to the store
      console.log('Reminder marked as shown:', currentReminder.id);
    }
  };

  const getMotivationalMessage = () => {
    if (currentStreak === 0) {
      return {
        message: "Ready to start your learning journey?",
        emoji: "🚀",
        color: "from-blue-500 to-purple-500"
      };
    } else if (currentStreak < 3) {
      return {
        message: "Great start! Keep the momentum going!",
        emoji: "🔥",
        color: "from-orange-500 to-red-500"
      };
    } else if (currentStreak < 7) {
      return {
        message: "You're building an amazing habit!",
        emoji: "⭐",
        color: "from-yellow-500 to-orange-500"
      };
    } else if (currentStreak < 14) {
      return {
        message: "A week strong! You're unstoppable!",
        emoji: "💪",
        color: "from-green-500 to-blue-500"
      };
    } else {
      return {
        message: "Legendary streak! You're a learning machine!",
        emoji: "👑",
        color: "from-purple-500 to-pink-500"
      };
    }
  };

  const getDailyGoalStatus = () => {
    const progress = (dailyProgress / dailyGoal) * 100;
    if (progress >= 100) {
      return {
        message: "Daily goal achieved! 🎉",
        emoji: "🎯",
        color: "from-green-500 to-emerald-500"
      };
    } else if (progress >= 50) {
      return {
        message: "Halfway there! Keep going!",
        emoji: "⚡",
        color: "from-yellow-500 to-orange-500"
      };
    } else {
      return {
        message: "Time to start learning!",
        emoji: "🌅",
        color: "from-blue-500 to-indigo-500"
      };
    }
  };

  const motivational = getMotivationalMessage();
  const goalStatus = getDailyGoalStatus();

  if (!showReminder) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${motivational.color} p-4 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6" />
                <span className="font-semibold">Daily Reminder</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Streak Info */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{motivational.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{motivational.message}</h3>
                             <div className="flex items-center justify-center space-x-4 text-white">
                 <div className="flex items-center space-x-2">
                   <Flame className="w-5 h-5 text-orange-400" />
                   <span className="font-semibold">{currentStreak}</span>
                 </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{totalXP}</span>
                </div>
              </div>
            </div>

            {/* Daily Goal Progress */}
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Daily Goal</span>
                <span className="text-green-400 font-bold">{dailyProgress}/{dailyGoal} XP</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((dailyProgress / dailyGoal) * 100, 100)}%` }}
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-400">{goalStatus.message}</span>
                <div className="text-2xl mt-1">{goalStatus.emoji}</div>
              </div>
            </div>

            {/* Custom Reminder */}
            {currentReminder && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-3xl mb-2">{currentReminder.emoji}</div>
                  <p className="text-white font-medium">{currentReminder.message}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Got it!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700"
              >
                <div className="text-center mb-6">
                  <Bell className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white">Reminder Settings</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Daily Reminders</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Streak Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Achievement Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyReminder;
