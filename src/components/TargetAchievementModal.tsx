import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2, Target, ExternalLink } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import MonthSelector from '@/components/MonthSelector';

interface TargetAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetKES: number;
  currentKES: number;
  month: string;
}

const TargetAchievementModal: React.FC<TargetAchievementModalProps> = ({
  isOpen,
  onClose,
  targetKES,
  currentKES,
  month
}) => {
  const { userProgress } = useGameStore();
  const [showNewTarget, setShowNewTarget] = useState(false);

  const handleShareProgress = () => {
    const text = `🎉 I just hit my ${month} savings target of KES ${targetKES.toLocaleString()}! 
💰 Total earned: KES ${userProgress.totalKESEarned.toLocaleString()}
🔥 Current streak: ${userProgress.currentStreak} days
🏆 Keep the fire burning with Ember Savings! #Bitcoin #EmberSavings`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://bitsacco.com')}`;
    window.open(twitterUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = `🎉 I just hit my ${month} savings target of KES ${targetKES.toLocaleString()}! 
💰 Total earned: KES ${userProgress.totalKESEarned.toLocaleString()}
🔥 Current streak: ${userProgress.currentStreak} days
🏆 Keep the fire burning with Ember Savings!`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSetNewTarget = () => {
    setShowNewTarget(true);
  };

  const handleTargetSet = () => {
    setShowNewTarget(false);
    onClose();
  };

  const handleDepositNow = () => {
    window.open('https://bitsacco.com', '_blank');
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
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">🎉 Target Achieved!</h2>
              <p className="text-gray-300">
                Congratulations! You've reached your {month} savings goal!
              </p>
            </div>

            {/* Achievement Details */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  KES {targetKES.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">
                  {month.charAt(0).toUpperCase() + month.slice(1)} Target Reached
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Current: KES {currentKES.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-black/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-white mb-3 text-center">Your Achievement Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-bitcoin-500">
                    KES {userProgress.totalKESEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Earned</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-savings-500">
                    {userProgress.currentStreak} 🔥
                  </div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleShareProgress}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Share on Twitter"
              >
                <Share2 className="w-4 h-4" />
                <span>Share on Twitter</span>
              </button>
              
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Share on WhatsApp"
              >
                <span>📱</span>
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleDepositNow}
                className="w-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-600 hover:to-bitcoin-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Deposit to Bitcoin wallet"
              >
                <span>💰</span>
                <span>Deposit to Bitcoin Wallet</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Set New Target */}
            <div className="border-t border-gray-600 pt-4">
              <button
                onClick={handleSetNewTarget}
                className="w-full bg-gradient-to-r from-bitsacco-500 to-bitsacco-600 hover:from-bitsacco-600 hover:to-bitsacco-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bitsacco-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Set new target"
              >
                <Target className="w-4 h-4" />
                <span>Set New Target</span>
              </button>
            </div>

            {/* New Target Form */}
            {showNewTarget && (
              <motion.div
                className="mt-4 p-4 bg-black/20 rounded-lg border border-bitsacco-500/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-semibold text-white mb-3 text-center">Set Your Next Target</h4>
                <MonthSelector onTargetSet={handleTargetSet} />
              </motion.div>
            )}

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                🎉 Keep the fire burning! Set new goals and continue your Bitcoin savings journey.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TargetAchievementModal;
