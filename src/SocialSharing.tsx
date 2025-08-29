import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, MessageCircle } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface SocialSharingProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ isOpen, onClose }) => {
  const { userProgress } = useGameStore();

  const getBadgeLevel = () => {
    const totalKES = userProgress.totalKESEarned;
    if (totalKES >= 1000) return { level: 'Bitcoin Master', icon: '👑', color: 'text-yellow-500' };
    if (totalKES >= 500) return { level: 'KES Collector', icon: '🏆', color: 'text-orange-500' };
    if (totalKES >= 200) return { level: 'Bitcoin Enthusiast', icon: '⭐', color: 'text-blue-500' };
    if (totalKES >= 100) return { level: 'KES Saver', icon: '💎', color: 'text-green-500' };
    return { level: 'Bitcoin Beginner', icon: '🌱', color: 'text-gray-500' };
  };

  const getStreakBadge = () => {
    const streak = userProgress.currentStreak;
    if (streak >= 30) return { level: 'Monthly Master', icon: '🔥', color: 'text-red-500' };
    if (streak >= 7) return { level: 'Weekly Warrior', icon: '⚡', color: 'text-orange-500' };
    if (streak >= 3) return { level: 'Consistent Saver', icon: '📈', color: 'text-green-500' };
    return { level: 'Getting Started', icon: '🌱', color: 'text-gray-500' };
  };

  const badgeLevel = getBadgeLevel();
  const streakBadge = getStreakBadge();

  const generateShareText = (platform: 'twitter' | 'whatsapp') => {
    const baseText = `🔥 I'm stacking KES with Ember Savings! 
💰 Total earned: KES ${userProgress.totalKESEarned.toLocaleString()}
🔥 Current streak: ${userProgress.currentStreak} days
${badgeLevel.icon} ${badgeLevel.level}
${streakBadge.icon} ${streakBadge.level}`;

    if (platform === 'twitter') {
      return `${baseText}\n\n#Bitcoin #EmberSavings #StackingSats`;
    }
    return baseText;
  };

  const handleTwitterShare = () => {
    const text = generateShareText('twitter');
    const url = encodeURIComponent('https://bitsacco.com');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(twitterUrl, '_blank');
    onClose();
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText('whatsapp');
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-bitsacco-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-bitsacco-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Share Your Progress</h2>
              <p className="text-gray-300">
                Show off your Bitcoin savings journey!
              </p>
            </div>

            {/* Progress Summary */}
            <div className="bg-black/20 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-bitcoin-500">
                    KES {userProgress.totalKESEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total KES</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-savings-500">
                    {userProgress.currentStreak} 🔥
                  </div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 bg-black/20 rounded-lg p-3">
                <span className="text-2xl">{badgeLevel.icon}</span>
                <div>
                  <div className={`font-semibold ${badgeLevel.color}`}>{badgeLevel.level}</div>
                  <div className="text-sm text-gray-400">Sats Achievement</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-black/20 rounded-lg p-3">
                <span className="text-2xl">{streakBadge.icon}</span>
                <div>
                  <div className={`font-semibold ${streakBadge.color}`}>{streakBadge.level}</div>
                  <div className="text-sm text-gray-400">Streak Achievement</div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleTwitterShare}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
                <span>Share on Twitter</span>
              </button>
              
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Share on WhatsApp</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                🚀 Inspire others to start their Bitcoin savings journey!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SocialSharing;
