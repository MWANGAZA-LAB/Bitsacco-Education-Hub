import React from 'react';
import { useGameStore } from '../store/gameStore';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  // No props needed anymore
}

const Header: React.FC<HeaderProps> = () => {
  const { savingsGoal, userProgress, resetProgress } = useGameStore();
  const totalEarned = userProgress?.totalKESEarned || 0;
  
  // Calculate progress percentage
  const progressPercentage = savingsGoal 
    ? Math.min((totalEarned / savingsGoal.targetKES) * 100, 100)
    : 0;

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-4 lg:px-6 py-3 lg:py-4 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        {/* Top row - Logo and Total earned */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <span className="text-2xl lg:text-3xl animate-pulse">🔥</span>
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Bitsacco
            </h1>
            <span className="text-2xl lg:text-3xl animate-pulse">🔥</span>
          </div>

          {/* Total earned - Mobile optimized */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="text-right bg-gray-700 rounded-lg px-3 py-2 shadow-lg">
              <p className="text-xs text-gray-400 font-medium">Total</p>
              <p className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {totalEarned.toLocaleString()} KES
              </p>
            </div>
            <button
              onClick={resetProgress}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Bottom row - Progress bar */}
        {savingsGoal && (
          <div className="w-full lg:flex-1 lg:mx-8 lg:max-w-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs lg:text-sm font-medium text-gray-300">Savings Progress</span>
              <span className="text-xs lg:text-sm font-medium text-gray-300">
                {totalEarned.toLocaleString()} / {savingsGoal.targetKES.toLocaleString()} KES
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 lg:h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 h-2 lg:h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 lg:mt-2">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{savingsGoal.month}</span>
              <span className="text-xs text-orange-400 font-bold">
                {progressPercentage.toFixed(1)}% Complete
              </span>
            </div>
          </div>
        )}

        {/* Right side - Total earned (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-right bg-gray-700 rounded-lg px-4 py-2 shadow-lg">
            <p className="text-xs text-gray-400 font-medium">Total Earned</p>
            <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {totalEarned.toLocaleString()} KES
            </p>
          </div>
          <button
            onClick={resetProgress}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset App</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
