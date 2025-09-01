import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Trash2 } from 'lucide-react';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'emergency_fund' | 'investment' | 'debt_payoff' | 'retirement' | 'vacation' | 'education' | 'other';
  priority: 'low' | 'medium' | 'high';
  monthlyContribution: number;
}

const GoalPlanningTool: React.FC = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: 'emergency_fund',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 2500,
      deadline: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000),
      category: 'emergency_fund',
      priority: 'high',
      monthlyContribution: 1250
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<FinancialGoal, 'id'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
    category: 'other',
    priority: 'medium',
    monthlyContribution: 0
  });

  const categories = [
    { value: 'emergency_fund', label: 'Emergency Fund', icon: '🛡️' },
    { value: 'investment', label: 'Investment', icon: '📈' },
    { value: 'debt_payoff', label: 'Debt Payoff', icon: '💳' },
    { value: 'retirement', label: 'Retirement', icon: '🏖️' },
    { value: 'vacation', label: 'Vacation', icon: '✈️' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'other', label: 'Other', icon: '💰' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'high', label: 'High', color: 'text-red-400' }
  ];

  const calculateGoalProgress = (goal: FinancialGoal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.icon || '💰';
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0) {
      const goal: FinancialGoal = {
        id: Date.now().toString(),
        ...newGoal
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        deadline: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
        category: 'other',
        priority: 'medium',
        monthlyContribution: 0
      });
      setShowAddForm(false);
    }
  };

  const updateGoalProgress = (goalId: string, newAmount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.min(newAmount, goal.targetAmount) }
        : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800 rounded-xl p-4 lg:p-6 shadow-xl border border-gray-700 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-green-400" />
          <h2 className="text-xl lg:text-2xl font-bold text-white">Goal Planning Tool</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              KES {totalCurrentAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Total Saved</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="text-xl font-bold text-blue-400">
              KES {totalTargetAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Total Target</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="text-lg font-bold text-purple-400">
              KES {totalMonthlyContribution.toLocaleString()}/month
            </div>
            <div className="text-sm text-gray-300">Monthly Contribution</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-white">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700 rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Goal Name</label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Vacation Fund"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as 'emergency_fund' | 'investment' | 'debt_payoff' | 'retirement' | 'vacation' | 'education' | 'other' })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Amount (KES)</label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Amount (KES)</label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Contribution (KES)</label>
              <input
                type="number"
                value={newGoal.monthlyContribution}
                onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {priorities.map(pri => (
                  <option key={pri.value} value={pri.value}>
                    {pri.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addGoal}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Your Financial Goals</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                  <div>
                    <h4 className="text-white font-semibold">{goal.name}</h4>
                    <div className="text-sm text-gray-400">
                      {getDaysUntilDeadline(goal.deadline)} days remaining
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority.toUpperCase()}
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">
                    KES {goal.currentAmount.toLocaleString()} / KES {goal.targetAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateGoalProgress(goal)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {Math.round(calculateGoalProgress(goal))}% complete
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-gray-400">Monthly Contribution</div>
                  <div className="text-white font-medium">KES {goal.monthlyContribution}</div>
                </div>
                <div>
                  <div className="text-gray-400">Monthly Goal</div>
                  <div className="text-white font-medium">
                    KES {Math.round((goal.targetAmount - goal.currentAmount) / Math.max(getDaysUntilDeadline(goal.deadline) / 30, 1))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={goal.currentAmount}
                  onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                  className="flex-1 px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Update progress"
                />
                <span className="text-xs text-gray-400">KES</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GoalPlanningTool;
