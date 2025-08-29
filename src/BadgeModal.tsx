import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { X, Star } from 'lucide-react';

const BadgeModal: React.FC = () => {
  const { userProgress } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [currentBadge, setCurrentBadge] = useState<any>(null);

  // Check for newly achieved milestones
  useEffect(() => {
    const newMilestones = userProgress.milestones.filter(
      milestone => milestone.isAchieved && !milestone.achievedAt
    );

    if (newMilestones.length > 0) {
      const latestMilestone = newMilestones[newMilestones.length - 1];
      setCurrentBadge(latestMilestone);
      setShowModal(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [userProgress.milestones]);

  const getBadgeIcon = (milestoneId: string) => {
    const icons: Record<string, string> = {
      'first-game': '🎉',
      'quarter-way': '🎯',
      'halfway': '🚀',
      'three-quarters': '🔥',
      'goal-achieved': '🏆',
      'streak-3': '📈',
      'streak-7': '🔥',
      'streak-30': '👑'
    };
    return icons[milestoneId] || '🏅';
  };

  const getBadgeColor = (milestoneId: string) => {
    const colors: Record<string, string> = {
      'first-game': 'text-bitsacco-500',
      'quarter-way': 'text-savings-500',
      'halfway': 'text-bitcoin-500',
      'three-quarters': 'text-orange-500',
      'goal-achieved': 'text-yellow-500',
      'streak-3': 'text-green-500',
      'streak-7': 'text-blue-500',
      'streak-30': 'text-purple-500'
    };
    return colors[milestoneId] || 'text-gray-500';
  };

  if (!showModal || !currentBadge) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Badge icon */}
            <motion.div
              className={`text-6xl mb-4 ${getBadgeColor(currentBadge.id)}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 200,
                delay: 0.2 
              }}
            >
              {getBadgeIcon(currentBadge.id)}
            </motion.div>

            {/* Badge title */}
            <motion.h2
              className="text-2xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentBadge.title}
            </motion.h2>

            {/* Badge description */}
            <motion.p
              className="text-gray-300 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentBadge.description}
            </motion.p>

            {/* Reward */}
            {currentBadge.reward && (
              <motion.div
                className="bg-bitcoin-500/20 border border-bitcoin-500/30 rounded-lg p-3 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-bitcoin-500" />
                  <span className="text-bitcoin-500 font-semibold">
                    +{currentBadge.reward} sats reward!
                  </span>
                </div>
              </motion.div>
            )}

            {/* Achievement message */}
            <motion.div
              className="text-sm text-gray-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              🎉 Achievement unlocked! Keep up the great work!
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgeModal;
