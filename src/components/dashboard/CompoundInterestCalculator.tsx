import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';

interface CalculatorResult {
  totalAmount: number;
  interestEarned: number;
  breakdown: Array<{
    year: number;
    balance: number;
    interest: number;
  }>;
}

const CompoundInterestCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    principal: 1000,
    monthlyContribution: 100,
    annualRate: 7,
    years: 10,
    compoundFrequency: 12 // monthly
  });
  
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCompoundInterest = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const { principal, monthlyContribution, annualRate, years, compoundFrequency } = formData;
      const ratePerPeriod = annualRate / 100 / compoundFrequency;
      const totalPeriods = years * compoundFrequency;
      
      let balance = principal;
      const breakdown = [];
      
      for (let period = 1; period <= totalPeriods; period++) {
        const interest = balance * ratePerPeriod;
        balance += interest + monthlyContribution;
        
        if (period % compoundFrequency === 0) {
          breakdown.push({
            year: period / compoundFrequency,
            balance: Math.round(balance * 100) / 100,
            interest: Math.round(interest * 100) / 100
          });
        }
      }
      
      const totalContributions = principal + (monthlyContribution * totalPeriods);
      const interestEarned = balance - totalContributions;
      
      setResult({
        totalAmount: Math.round(balance * 100) / 100,
        interestEarned: Math.round(interestEarned * 100) / 100,
        breakdown
      });
      
      setIsCalculating(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800 rounded-xl p-4 lg:p-6 shadow-xl border border-gray-700 max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl lg:text-2xl font-bold text-white">Compound Interest Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Investment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Investment (KES)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={formData.principal}
                    onChange={(e) => handleInputChange('principal', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Contribution (KES)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={formData.monthlyContribution}
                    onChange={(e) => handleInputChange('monthlyContribution', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Annual Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={formData.annualRate}
                    onChange={(e) => handleInputChange('annualRate', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Period (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={formData.years}
                    onChange={(e) => handleInputChange('years', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10"
                  />
                </div>
              </div>

              <button
                onClick={calculateCompoundInterest}
                disabled={isCalculating}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Growth</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    KES {result.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Amount</div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-xl font-bold text-blue-400">
                    KES {result.interestEarned.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Interest Earned</div>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-lg font-bold text-purple-400">
                    KES {(formData.principal + (formData.monthlyContribution * formData.years * 12)).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Contributions</div>
                </div>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <h4 className="text-white font-semibold mb-3">Year-by-Year Breakdown</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {result.breakdown.map((year) => (
                  <div key={year.year} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                    <span className="text-gray-300">Year {year.year}</span>
                    <span className="text-white font-medium">
                      KES {year.balance.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CompoundInterestCalculator;
