import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

interface WelcomeScreenProps {
  onTargetSet: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onTargetSet }) => {
  const { setSavingsGoal } = useGameStore();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [targetKES, setTargetKES] = useState('');

  const monthTargets = {
    'september': { min: 500, max: 2000 },
    'october': { min: 1000, max: 3000 },
    'november': { min: 1500, max: 4000 },
    'december': { min: 2000, max: 5000 }
  };

  const handleSetTarget = () => {
    if (selectedMonth && targetKES) {
      const target = parseInt(targetKES);
      const monthTarget = monthTargets[selectedMonth as keyof typeof monthTargets];
      
      if (target >= monthTarget.min && target <= monthTarget.max) {
        setSavingsGoal(target, selectedMonth as 'september' | 'october' | 'november' | 'december');
        onTargetSet();
      } else {
        alert(`Target must be between ${monthTarget.min.toLocaleString()} and ${monthTarget.max.toLocaleString()} KES for ${selectedMonth}`);
      }
    } else {
      alert('Please select a month and set a target');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">
            🔥 Bitsacco Ember Hub
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome to your Bitcoin savings journey!
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Your Savings Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Choose a month...</option>
              <option value="september">September (500-2,000 KES)</option>
              <option value="october">October (1,000-3,000 KES)</option>
              <option value="november">November (1,500-4,000 KES)</option>
              <option value="december">December (2,000-5,000 KES)</option>
            </select>
          </div>

          {selectedMonth && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Set Your Monthly Target (KES)
              </label>
              <input
                type="number"
                value={targetKES}
                onChange={(e) => setTargetKES(e.target.value)}
                placeholder={`${monthTargets[selectedMonth as keyof typeof monthTargets]?.min.toLocaleString()} - ${monthTargets[selectedMonth as keyof typeof monthTargets]?.max.toLocaleString()} KES`}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-sm text-gray-400 mt-1">
                Target range: {monthTargets[selectedMonth as keyof typeof monthTargets]?.min.toLocaleString()} - {monthTargets[selectedMonth as keyof typeof monthTargets]?.max.toLocaleString()} KES
              </p>
            </div>
          )}

          <button
            onClick={handleSetTarget}
            disabled={!selectedMonth || !targetKES}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start My Savings Journey! 🚀
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Visit <a href="https://bitsacco.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">bitsacco.com</a> to learn more about Bitcoin savings
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
