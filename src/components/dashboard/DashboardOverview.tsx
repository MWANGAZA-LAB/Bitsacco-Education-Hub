import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FinancialMetric, FinancialGoal } from '../../types/dashboard';
import { Shield, Target, TrendingUp, Edit } from 'lucide-react';
import {
  formatCurrency,
  calculateProgress,
  getPriorityColor
} from '../../utils/formatters';
import FinancialMetricsManager from './FinancialMetricsManager';

interface DashboardOverviewProps {
  financialMetrics: FinancialMetric[];
  financialGoals: FinancialGoal[];
  userProgress: {
    totalXP: number;
    currentStreak: number;
    completedLessons: string[];
  };
  savingsGoal: {
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
  } | null;
  onMetricsUpdate: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  financialMetrics,
  financialGoals,
  userProgress,
  savingsGoal,
  onMetricsUpdate
}) => {
  const [showMetricsManager, setShowMetricsManager] = useState(false);
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergency_fund':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      default:
        return <Target className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
                 {/* Financial Metrics */}
           <div>
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
               <button
                 onClick={() => setShowMetricsManager(true)}
                 className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
               >
                 <Edit className="w-4 h-4" />
                 <span className="text-sm">Edit Metrics</span>
               </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{metric.label}</span>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.label === 'Savings Rate' ? `${metric.value}%` : formatCurrency(metric.value)}
              </div>
              <div className={`flex items-center text-sm ${metric.color}`}>
                {metric.changeType === 'positive' ? '+' : ''}{metric.change}%
                <span className="ml-1">from last month</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Financial Goals */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Financial Goals</h3>
        <div className="space-y-4">
          {financialGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(goal.category)}
                  <div>
                    <h4 className="text-white font-semibold">{goal.name}</h4>
                    <p className="text-gray-400 text-sm">
                      Due: {goal.deadline.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Monthly contribution:</span>
                <span className="text-white">{formatCurrency(goal.monthlyContribution)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Savings Progress */}
      {savingsGoal && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Savings Goal Progress</h3>
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-3">
                              <span className="text-gray-400">Target: {formatCurrency(savingsGoal.targetAmount)}</span>
              <span className="text-white font-semibold">
                                  {formatCurrency(userProgress.totalXP)}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress(userProgress.totalXP, savingsGoal.targetAmount)}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {userProgress.totalXP >= savingsGoal.targetAmount 
                ? '🎉 Goal achieved!' 
                : `${formatCurrency(savingsGoal.targetAmount - userProgress.totalXP)} remaining`
              }
            </div>
          </div>
        </div>
      )}
      </motion.div>

      {/* Financial Metrics Manager Modal */}
      <AnimatePresence>
        {showMetricsManager && (
          <FinancialMetricsManager
            onMetricsUpdate={onMetricsUpdate}
            onClose={() => setShowMetricsManager(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardOverview;
