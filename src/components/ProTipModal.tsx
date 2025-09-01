import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Lightbulb } from 'lucide-react';

interface ProTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: 'privacyJenga';
}

const PRO_TIPS = {
  privacyJenga: {
    title: '🧩 Privacy Jenga Pro Tip',
    tip: 'Pay attention to the privacy lessons in the game! Understanding privacy is crucial for protecting your Bitcoin and personal information in the digital age.',
    gameUrl: 'https://mwangaza-lab.github.io/Privacy-Jenga/',
    gameName: 'Privacy Jenga Game'
  }
};

const ProTipModal: React.FC<ProTipModalProps> = ({ isOpen, onClose, gameType }) => {
  const proTip = PRO_TIPS[gameType];

  const handlePlayGame = () => {
    window.open(proTip.gameUrl, '_blank');
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-white">{proTip.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Pro Tip Content */}
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-100 leading-relaxed">
                  {proTip.tip}
                </p>
              </div>

              {/* Game Link */}
              <div className="bg-bitcoin-500/10 border border-bitcoin-500/30 rounded-lg p-4">
                <h3 className="text-bitcoin-400 font-semibold mb-2">Ready to Learn?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Click the button below to open the educational game in a new tab.
                </p>
                <button
                  onClick={handlePlayGame}
                  className="w-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-600 hover:to-bitcoin-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                  aria-label={`Open ${proTip.gameName}`}
                >
                  <span>Play {proTip.gameName}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Reminder */}
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  💡 Remember: Educational games help you understand Bitcoin better!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProTipModal;
