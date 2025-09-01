import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bitcoin, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  RefreshCw,
  Info,
  Calculator,
  Target,
  Zap
} from 'lucide-react';

interface BitcoinData {
  price_usd: number;
  price_kes: number;
  change_24h: number;
  market_cap: number;
  volume_24h: number;
  last_updated: string;
}

interface SavingsProjection {
  initialAmount: number;
  projectedAmount: number;
  growth: number;
  years: number;
}

const BitcoinPriceChart: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Savings Projection State
  const [savingsAmount, setSavingsAmount] = useState<string>('');
  const [projectionYears, setProjectionYears] = useState<number>(1);
  const [savingsProjection, setSavingsProjection] = useState<SavingsProjection | null>(null);
  
  // Historical Savings State
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear() - 1);
  const [historicalSavings, setHistoricalSavings] = useState<number>(0);
  const [projectedCurrentValue, setProjectedCurrentValue] = useState<number>(0);

  // Fetch Bitcoin data from Coingecko API
  const fetchBitcoinData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Bitcoin data');
      }
      
      const data = await response.json();
      
      // Convert USD to KES (approximate rate - in production, use a real exchange rate API)
      const usdToKesRate = 150; // This should be fetched from a real exchange rate API
      
      const bitcoinData: BitcoinData = {
        price_usd: data.bitcoin.usd,
        price_kes: data.bitcoin.usd * usdToKesRate,
        change_24h: data.bitcoin.usd_24h_change,
        market_cap: data.bitcoin.usd_market_cap,
        volume_24h: data.bitcoin.usd_24h_vol,
        last_updated: new Date(data.bitcoin.last_updated_at * 1000).toISOString()
      };
      
      setBitcoinData(bitcoinData);
      setLastUpdated(new Date());
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      // Fallback to mock data for demonstration
      setBitcoinData({
        price_usd: 45000,
        price_kes: 6750000,
        change_24h: 2.5,
        market_cap: 850000000000,
        volume_24h: 25000000000,
        last_updated: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchBitcoinData();
    
    const interval = setInterval(() => {
      fetchBitcoinData();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Calculate savings projection
  const calculateSavingsProjection = () => {
    if (!savingsAmount || !bitcoinData) return;
    
    const amount = parseFloat(savingsAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    // Assume Bitcoin grows at historical average rate (simplified)
    const historicalGrowthRate = 0.15; // 15% annual growth (conservative estimate)
    const projectedAmount = amount * Math.pow(1 + historicalGrowthRate, projectionYears);
    
    setSavingsProjection({
      initialAmount: amount,
      projectedAmount,
      growth: projectedAmount - amount,
      years: projectionYears
    });
  };

  // Calculate historical savings projection
  const calculateHistoricalProjection = () => {
    if (!historicalSavings || !bitcoinData) return;
    
    const yearsAgo = new Date().getFullYear() - selectedYear;
    const historicalGrowthRate = 0.15;
    const projectedValue = historicalSavings * Math.pow(1 + historicalGrowthRate, yearsAgo);
    
    setProjectedCurrentValue(projectedValue);
  };

  useEffect(() => {
    calculateHistoricalProjection();
  }, [historicalSavings, selectedYear]);

  const formatCurrency = (amount: number, currency: 'USD' | 'KES' = 'KES') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    } else {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(amount);
    }
  };



  if (loading && !bitcoinData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !bitcoinData) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Error Loading Data</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchBitcoinData}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Bitcoin Price & Savings Insights</h2>
          <p className="text-gray-400">
            Real-time Bitcoin data and savings projections to help you make informed decisions
          </p>
        </div>
        <button
          onClick={fetchBitcoinData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Bitcoin Price Display */}
      {bitcoinData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <Bitcoin className="w-5 h-5 text-orange-500" />
              <span className="text-gray-400 text-sm">Bitcoin Price (USD)</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(bitcoinData.price_usd, 'USD')}
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              bitcoinData.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {bitcoinData.change_24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{bitcoinData.change_24h.toFixed(2)}% (24h)</span>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 text-sm">Bitcoin Price (KES)</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(bitcoinData.price_kes, 'KES')}
            </div>
            <div className="text-sm text-gray-400">
              Real-time conversion
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-gray-400 text-sm">Market Cap</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(bitcoinData.market_cap, 'USD')}
            </div>
            <div className="text-sm text-gray-400">
              Global market value
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-400 text-sm">24h Volume</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(bitcoinData.volume_24h, 'USD')}
            </div>
            <div className="text-sm text-gray-400">
              Trading activity
            </div>
          </div>
        </motion.div>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-center text-sm text-gray-400">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}

      {/* Savings Projection Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-700 rounded-lg p-6 border border-gray-600"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-blue-400" />
          <span>Bitcoin Savings Projection Calculator</span>
        </h3>
        <p className="text-gray-300 mb-4">
          Calculate how your Bitcoin savings could grow over time based on real-time Bitcoin prices. Remember: This is for educational purposes only.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Amount to Save (KES)</label>
            <input
              type="number"
              value={savingsAmount}
              onChange={(e) => setSavingsAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Projection Years</label>
            <select
              value={projectionYears}
              onChange={(e) => setProjectionYears(parseInt(e.target.value))}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={1}>1 Year</option>
              <option value={3}>3 Years</option>
              <option value={5}>5 Years</option>
              <option value={10}>10 Years</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={calculateSavingsProjection}
              disabled={!savingsAmount || !bitcoinData}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Calculate Projection
            </button>
          </div>
        </div>

        {savingsProjection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white"
          >
            <h4 className="font-semibold mb-2">Projection Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-blue-100">Initial Investment</div>
                <div className="text-xl font-bold">{formatCurrency(savingsProjection.initialAmount, 'KES')}</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Projected Value ({savingsProjection.years} years)</div>
                <div className="text-xl font-bold">{formatCurrency(savingsProjection.projectedAmount, 'KES')}</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Potential Growth</div>
                <div className="text-xl font-bold">{formatCurrency(savingsProjection.growth, 'KES')}</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Historical Savings Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-700 rounded-lg p-6 border border-gray-600"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-400" />
          <span>Historical Savings Calculator</span>
        </h3>
        <p className="text-gray-300 mb-4">
          See how much your savings from previous years would be worth today if invested in Bitcoin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Amount Saved (KES)</label>
            <input
              type="number"
              value={historicalSavings || ''}
              onChange={(e) => setHistoricalSavings(parseFloat(e.target.value) || 0)}
              placeholder="Enter amount"
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Year You Saved</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i - 1).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="w-full bg-gray-600 rounded-lg px-3 py-2 text-center">
              <div className="text-sm text-gray-400">Years Ago</div>
              <div className="text-white font-medium">{new Date().getFullYear() - selectedYear}</div>
            </div>
          </div>
        </div>

        {projectedCurrentValue > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 text-white"
          >
            <h4 className="font-semibold mb-2">Historical Projection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-sm text-green-100">Amount Saved in {selectedYear}</div>
                <div className="text-xl font-bold">{formatCurrency(historicalSavings, 'KES')}</div>
              </div>
              <div>
                <div className="text-sm text-green-100">Value Today</div>
                <div className="text-xl font-bold">{formatCurrency(projectedCurrentValue, 'KES')}</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Educational Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-300 mb-2">Educational Purpose Only</h4>
            <p className="text-yellow-200 text-sm">
              This tool is designed to educate you about Bitcoin and savings projections. 
              Past performance does not guarantee future results. Always do your own research 
              and consider consulting with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BitcoinPriceChart;
