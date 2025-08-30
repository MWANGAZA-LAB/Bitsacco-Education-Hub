import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ExternalLink, CheckCircle } from 'lucide-react';

interface DepositReminderProps {
  isOpen: boolean;
  onClose: () => void;
  kesEarned: number;
  gameName: string;
}

const DepositReminder: React.FC<DepositReminderProps> = ({
  isOpen,
  onClose,
  kesEarned,
  gameName
}) => {
  const handleDepositNow = () => {
    window.open('https://bitsacco.com', '_blank');
    onClose();
  };

  const handleRemindLater = () => {
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
              <div className="w-16 h-16 bg-bitcoin-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-bitcoin-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">💰 Deposit Reminder</h2>
                             <p className="text-gray-300">
                 Great job earning KES {kesEarned.toLocaleString()} from {gameName}!
               </p>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div className="bg-bitcoin-500/10 border border-bitcoin-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-bitcoin-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-bitcoin-400 mb-2">
                      Build Real Bitcoin Savings
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      To make your virtual sats real, deposit the equivalent amount in your Bitcoin wallet. 
                      This builds the habit of actual Bitcoin savings!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-savings-500/10 border border-savings-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-savings-400 mb-2">💡 Pro Tip</h3>
                                 <p className="text-gray-300 text-sm">
                   Even small amounts add up! Consider depositing KES {kesEarned.toLocaleString()} (or more) 
                   to your Bitcoin wallet to start building real wealth.
                 </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDepositNow}
                className="w-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-600 hover:to-bitcoin-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 min-h-[44px]"
                aria-label="Deposit to Bitcoin wallet"
              >
                <span>Deposit to Bitcoin Wallet</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleRemindLater}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 min-h-[44px]"
                aria-label="Remind me later"
              >
                Remind Me Later
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                💰 Small deposits today = Big Bitcoin wealth tomorrow
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DepositReminder;
