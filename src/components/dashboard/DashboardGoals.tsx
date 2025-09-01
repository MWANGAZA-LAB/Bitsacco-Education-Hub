import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FinancialGoal } from '../../types/dashboard';
import { Target, Plus, Calendar, DollarSign, Edit, Trash2 } from 'lucide-react';
import { userDataManager } from '../../utils/userDataManager';
import {
  formatCurrency,
  calculateProgress,
  getDaysRemaining,
  getProgressColor
} from '../../utils/formatters';

interface DashboardGoalsProps {
  goals: FinancialGoal[];
  onGoalsChange: () => void;
}

const DashboardGoals: React.FC<DashboardGoalsProps> = ({ goals, onGoalsChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'emergency_fund' as FinancialGoal['category'],
    priority: 'medium' as FinancialGoal['priority'],
    deadline: '',
    monthlyContribution: '',
    currentAmount: '0'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData = {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: new Date(formData.deadline),
      category: formData.category,
      priority: formData.priority,
      monthlyContribution: parseFloat(formData.monthlyContribution)
    };

    if (editingGoal) {
      userDataManager.updateFinancialGoal(editingGoal.id, goalData);
    } else {
      userDataManager.addFinancialGoal(goalData);
    }

    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      category: 'emergency_fund',
      priority: 'medium',
      deadline: '',
      monthlyContribution: '',
      currentAmount: '0'
    });
    setShowAddForm(false);
    setEditingGoal(null);
    onGoalsChange();
  };

  const handleEdit = (goal: FinancialGoal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      category: goal.category,
      priority: goal.priority,
      deadline: goal.deadline.toISOString().split('T')[0],
      monthlyContribution: goal.monthlyContribution.toString(),
      currentAmount: goal.currentAmount.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = (goalId: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      userDataManager.deleteFinancialGoal(goalId);
      onGoalsChange();
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingGoal(null);
    setFormData({
      name: '',
      targetAmount: '',
      category: 'emergency_fund',
      priority: 'medium',
      deadline: '',
      monthlyContribution: '',
      currentAmount: '0'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Financial Goals</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Add/Edit Goal Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-700 rounded-lg p-6 border border-gray-600"
        >
          <h4 className="text-white font-semibold mb-4">
            {editingGoal ? 'Edit Financial Goal' : 'Add New Financial Goal'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Goal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Emergency Fund"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Target Amount (KES)</label>
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="10000"
                  min="0"
                  step="100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Current Amount (KES)</label>
                <input
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => handleInputChange('currentAmount', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="0"
                  min="0"
                  step="100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Monthly Contribution (KES)</label>
                <input
                  type="number"
                  value={formData.monthlyContribution}
                  onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="1000"
                  min="0"
                  step="100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="emergency_fund">Emergency Fund</option>
                  <option value="investment">Investment</option>
                  <option value="debt_payoff">Debt Payoff</option>
                  <option value="retirement">Retirement</option>
                  <option value="vacation">Vacation</option>
                  <option value="education">Education</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Priority</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Target Date</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {editingGoal ? 'Update Goal' : 'Add Goal'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h4 className="text-gray-400 text-lg font-medium mb-2">No Financial Goals Yet</h4>
            <p className="text-gray-500 mb-4">Start by adding your first financial goal to track your progress.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Your First Goal
            </button>
          </div>
        ) : (
          goals.map((goal, index) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const daysRemaining = getDaysRemaining(goal.deadline);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{goal.name}</h4>
                      <p className="text-gray-400 text-sm capitalize">{goal.category.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      goal.priority === 'high' ? 'bg-red-500 text-white' :
                      goal.priority === 'medium' ? 'bg-yellow-500 text-black' :
                      'bg-green-500 text-white'
                    }`}>
                      {goal.priority.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Current</p>
                      <p className="text-white font-semibold">{formatCurrency(goal.currentAmount)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Target</p>
                      <p className="text-white font-semibold">{formatCurrency(goal.targetAmount)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Due In</p>
                      <p className="text-white font-semibold">{daysRemaining} days</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(progress)} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Monthly contribution: <span className="text-white font-medium">{formatCurrency(goal.monthlyContribution)}</span>
                  </div>
                  <button 
                    onClick={() => handleEdit(goal)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Update Progress
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default DashboardGoals;
