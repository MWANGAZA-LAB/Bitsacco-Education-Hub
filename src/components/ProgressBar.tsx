import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currencyConverter';

interface ProgressBarProps {
  progress: number;
  current: number;
  target: number;
  currency: 'KES' | 'SATS';
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  current,
  target,
  currency,
  showLabels = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-300">
            {formatCurrency(current, currency)}
          </div>
          <div className="text-sm text-gray-400">
            {formatCurrency(target, currency)}
          </div>
        </div>
      )}
      
      <div className={`progress-bar ${sizeClasses[size]}`}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: 0.2 
          }}
        />
      </div>
      
      {showLabels && (
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-400">
            {clampedProgress.toFixed(1)}% Complete
          </div>
          <div className="text-xs text-gray-400">
            {formatCurrency(target - current, currency)} remaining
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
