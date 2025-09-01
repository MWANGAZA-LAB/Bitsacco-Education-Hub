import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, BarChart3, Save, X } from 'lucide-react';
import { userDataManager } from '../../utils/userDataManager';


interface FinancialMetricsManagerProps {
  onMetricsUpdate: () => void;
  onClose: () => void;
}

const FinancialMetricsManager: React.FC<FinancialMetricsManagerProps> = ({ 
  onMetricsUpdate, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    netWorth: '',
    monthlySavings: '',
    savingsRate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const metrics = {
      netWorth: parseFloat(formData.netWorth) || 0,
      monthlySavings: parseFloat(formData.monthlySavings) || 0,
      savingsRate: parseFloat(formData.savingsRate) || 0
    };

    userDataManager.updateFinancialMetrics(metrics);
    onMetricsUpdate();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Update Financial Metrics</h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Net Worth (KES)
            </label>
            <input
              type="number"
              value={formData.netWorth}
              onChange={(e) => handleInputChange('netWorth', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter your total net worth"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2 flex items-center">
              <PiggyBank className="w-4 h-4 mr-2" />
              Monthly Savings (KES)
            </label>
            <input
              type="number"
              value={formData.monthlySavings}
              onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="How much you save monthly"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Savings Rate (%)
            </label>
            <input
              type="number"
              value={formData.savingsRate}
              onChange={(e) => handleInputChange('savingsRate', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Percentage of income saved"
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-gray-400 text-xs mt-1">
              Percentage of your monthly income that you save
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Metrics</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FinancialMetricsManager;
