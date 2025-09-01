import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Plus, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  type: 'income' | 'expense';
}

const BudgetTracker: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: 'food', name: 'Food & Dining', budget: 500, spent: 320, color: 'bg-red-500', icon: '🍽️' },
    { id: 'transport', name: 'Transportation', budget: 300, spent: 180, color: 'bg-blue-500', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', budget: 200, spent: 150, color: 'bg-purple-500', icon: '🎬' },
    { id: 'utilities', name: 'Utilities', budget: 400, spent: 380, color: 'bg-green-500', icon: '⚡' },
    { id: 'shopping', name: 'Shopping', budget: 300, spent: 220, color: 'bg-yellow-500', icon: '🛍️' }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Grocery shopping', amount: 120, category: 'food', date: new Date(), type: 'expense' },
    { id: '2', description: 'Salary', amount: 5000, category: 'income', date: new Date(), type: 'income' },
    { id: '3', description: 'Fuel', amount: 80, category: 'transport', date: new Date(), type: 'expense' },
    { id: '4', description: 'Movie tickets', amount: 50, category: 'entertainment', date: new Date(), type: 'expense' }
  ]);

  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: 0,
    category: 'food',
    type: 'expense' as 'income' | 'expense'
  });

  const [monthlyIncome] = useState(5000);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const remainingBudget = totalBudget - totalSpent;

  const getCategoryProgress = (category: BudgetCategory) => {
    return Math.min((category.spent / category.budget) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-red-500';
    if (progress >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount > 0) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        ...newTransaction,
        date: new Date()
      };
      
      setTransactions([transaction, ...transactions]);
      
      // Update category spent amount
      if (newTransaction.type === 'expense') {
        setCategories(categories.map(cat => 
          cat.id === newTransaction.category 
            ? { ...cat, spent: cat.spent + newTransaction.amount }
            : cat
        ));
      }
      
      setNewTransaction({
        description: '',
        amount: 0,
        category: 'food',
        type: 'expense'
      });
      setShowAddTransaction(false);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '💰';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800 rounded-xl p-4 lg:p-6 shadow-xl border border-gray-700 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl lg:text-2xl font-bold text-white">Budget Tracker</h2>
        </div>
        <button
          onClick={() => setShowAddTransaction(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">Monthly Income</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            KES {monthlyIncome.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300">Total Budget</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            KES {totalBudget.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-300">Total Spent</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            KES {totalSpent.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-300">Remaining</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            KES {remainingBudget.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Budget Categories</h3>
        <div className="space-y-4">
          {categories.map((category) => {
            const progress = getCategoryProgress(category);
            return (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <div className="text-white font-medium">{category.name}</div>
                      <div className="text-sm text-gray-400">
                        KES {category.spent.toLocaleString()} / KES {category.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-400">
                      {progress >= 100 ? 'Over budget' : 'Remaining'}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full ${getProgressColor(progress)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Transaction Form */}
      {showAddTransaction && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700 rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Grocery shopping"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount (KES)</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addTransaction}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Transaction
            </button>
            <button
              onClick={() => setShowAddTransaction(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(transaction.category)}`}>
                    <span className="text-white text-sm">{getCategoryIcon(transaction.category)}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-400">
                      {transaction.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`text-right ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="font-medium">
                    {transaction.type === 'income' ? '+' : '-'} KES {transaction.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">{transaction.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetTracker;
