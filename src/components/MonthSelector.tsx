import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { MONTH_CHALLENGES } from '@/types';

interface MonthSelectorProps {
  onTargetSet?: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ onTargetSet }) => {
  const { savingsGoal, setSavingsGoal } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [targetKES, setTargetKES] = useState(savingsGoal?.targetKES || 0);

  const currentMonth = savingsGoal?.month || 'september';
  const monthChallenge = MONTH_CHALLENGES[currentMonth as keyof typeof MONTH_CHALLENGES];

  const handleMonthSelect = (month: keyof typeof MONTH_CHALLENGES) => {
    const challenge = MONTH_CHALLENGES[month];
    const defaultTarget = (challenge.monthlyGoal.min + challenge.monthlyGoal.max) / 2;
    setTargetKES(defaultTarget);
    setSavingsGoal(defaultTarget, month as 'september' | 'october' | 'november' | 'december');
    setIsOpen(false);
    onTargetSet?.();
  };

  const handleTargetChange = (value: number) => {
    const challenge = MONTH_CHALLENGES[currentMonth as keyof typeof MONTH_CHALLENGES];
    const clampedValue = Math.max(challenge.monthlyGoal.min, Math.min(challenge.monthlyGoal.max, value));
    setTargetKES(clampedValue);
    setSavingsGoal(clampedValue, currentMonth as 'september' | 'october' | 'november' | 'december');
    onTargetSet?.();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-bitsacco-500" />
        <h3 className="text-lg font-semibold text-white">Select Your Savings Month</h3>
      </div>

      {/* Month Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-black/20 border border-white/10 rounded-lg p-4 flex items-center justify-between hover:border-bitsacco-500/50 transition-colors min-h-[44px]"
          aria-label="Select savings month"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{monthChallenge.theme === 'Getting started' ? '🌱' : 
              monthChallenge.theme === 'Step it up' ? '📈' : 
              monthChallenge.theme === 'No excuses' ? '💪' : '🎄'}</span>
            <div className="text-left">
              <div className="font-semibold text-white capitalize">{currentMonth}</div>
              <div className="text-sm text-gray-400">{monthChallenge.theme}</div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {Object.entries(MONTH_CHALLENGES).map(([month, challenge]) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(month as keyof typeof MONTH_CHALLENGES)}
                className="w-full p-4 flex items-center space-x-3 hover:bg-gray-700 transition-colors text-left"
                aria-label={`Select ${month} challenge`}
              >
                <span className="text-2xl">
                  {challenge.theme === 'Getting started' ? '🌱' : 
                   challenge.theme === 'Step it up' ? '📈' : 
                   challenge.theme === 'No excuses' ? '💪' : '🎄'}
                </span>
                <div>
                  <div className="font-semibold text-white capitalize">{month}</div>
                  <div className="text-sm text-gray-400">{challenge.theme}</div>
                  <div className="text-xs text-bitcoin-500">
                    KES {challenge.monthlyGoal.min.toLocaleString()} - {challenge.monthlyGoal.max.toLocaleString()}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Target Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Set Your Target (KES {monthChallenge.monthlyGoal.min.toLocaleString()} - {monthChallenge.monthlyGoal.max.toLocaleString()})
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={targetKES}
            onChange={(e) => handleTargetChange(Number(e.target.value))}
            min={monthChallenge.monthlyGoal.min}
            max={monthChallenge.monthlyGoal.max}
            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-bitsacco-500 focus:outline-none"
            placeholder="Enter your target"
            aria-label="Set savings target"
          />
          <span className="text-gray-400">KES</span>
        </div>
        <div className="text-xs text-gray-500">
          Daily target: KES {monthChallenge.dailyTarget.toLocaleString()}
          {monthChallenge.bonus && ` • ${monthChallenge.bonus}`}
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;
