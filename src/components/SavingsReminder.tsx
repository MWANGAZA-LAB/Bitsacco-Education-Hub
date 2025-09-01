import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Settings } from 'lucide-react';
import { userDataManager, SavingsReminder as ReminderType } from '../utils/userDataManager';

interface SavingsReminderProps {
  onClose?: () => void;
}

const SavingsReminder: React.FC<SavingsReminderProps> = ({ onClose }) => {
  const [currentReminder, setCurrentReminder] = useState<ReminderType | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [customEmoji, setCustomEmoji] = useState('💰');

  useEffect(() => {
    const checkForReminders = () => {
      const activeReminders = userDataManager.getActiveReminders();
      if (activeReminders.length > 0) {
        // Show the first active reminder
        setCurrentReminder(activeReminders[0]);
      }
    };

    // Check immediately
    checkForReminders();

    // Check every hour
    const interval = setInterval(checkForReminders, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    if (currentReminder) {
      userDataManager.markReminderShown(currentReminder.id);
      setCurrentReminder(null);
    }
    onClose?.();
  };

  const handleAddCustomReminder = () => {
    if (customMessage.trim()) {
      userDataManager.addCustomReminder({
        message: customMessage,
        emoji: customEmoji,
        frequency: 'daily',
        lastShown: new Date(0),
        isActive: true
      });
      setCustomMessage('');
      setCustomEmoji('💰');
      setShowSettings(false);
    }
  };

  const emojiOptions = ['💰', '🎯', '📊', '🛡️', '🧠', '💎', '🚀', '⭐', '🔥', '💪'];

  if (!currentReminder && !showSettings) {
    return null;
  }

  return (
    <AnimatePresence>
      {currentReminder && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 shadow-xl border border-orange-400">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Savings Reminder</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">{currentReminder.emoji}</div>
              <p className="text-white text-lg font-medium mb-3">
                {currentReminder.message}
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleDismiss}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    handleDismiss();
                    // Navigate to dashboard or games
                    window.location.href = '#dashboard';
                  }}
                  className="bg-white text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Saving
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className="bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Reminder Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Custom Message</label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter your custom reminder message..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Choose Emoji</label>
                <div className="grid grid-cols-5 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setCustomEmoji(emoji)}
                      className={`p-2 rounded-lg text-xl transition-colors ${
                        customEmoji === emoji
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomReminder}
                  disabled={!customMessage.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavingsReminder;
