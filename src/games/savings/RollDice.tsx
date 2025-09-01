import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface InvestmentScenario {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  investmentAmount: number;
  potentialReturn: number;
  potentialLoss: number;
  probability: number;
  educationalTip: string;
  category: 'stocks' | 'crypto' | 'bonds' | 'real_estate';
}

interface RollDiceProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
}

const INVESTMENT_SCENARIOS: InvestmentScenario[] = [
  {
    id: 'conservative_bonds',
    name: 'Government Bonds',
    description: 'Low-risk government bonds with steady returns',
    riskLevel: 'low',
    investmentAmount: 1000,
    potentialReturn: 50,
    potentialLoss: 10,
    probability: 85,
    educationalTip: 'Government bonds are considered safe investments with predictable returns, perfect for conservative investors.',
    category: 'bonds'
  },
  {
    id: 'blue_chip_stocks',
    name: 'Blue Chip Stocks',
    description: 'Well-established company stocks with moderate risk',
    riskLevel: 'medium',
    investmentAmount: 1000,
    potentialReturn: 150,
    potentialLoss: 100,
    probability: 70,
    educationalTip: 'Blue chip stocks represent large, stable companies. They offer good balance between risk and return.',
    category: 'stocks'
  },
  {
    id: 'bitcoin_investment',
    name: 'Bitcoin Investment',
    description: 'Cryptocurrency investment with high volatility',
    riskLevel: 'high',
    investmentAmount: 1000,
    potentialReturn: 300,
    potentialLoss: 200,
    probability: 60,
    educationalTip: 'Bitcoin is highly volatile but has shown strong long-term growth. Only invest what you can afford to lose.',
    category: 'crypto'
  },
  {
    id: 'real_estate',
    name: 'Real Estate Fund',
    description: 'Real estate investment trust with moderate risk',
    riskLevel: 'medium',
    investmentAmount: 1000,
    potentialReturn: 120,
    potentialLoss: 80,
    probability: 75,
    educationalTip: 'Real estate can provide steady income and appreciation, but requires careful market analysis.',
    category: 'real_estate'
  },
  {
    id: 'growth_stocks',
    name: 'Growth Stocks',
    description: 'High-growth potential stocks with higher risk',
    riskLevel: 'high',
    investmentAmount: 1000,
    potentialReturn: 250,
    potentialLoss: 150,
    probability: 55,
    educationalTip: 'Growth stocks can offer high returns but come with significant risk. Diversification is key.',
    category: 'stocks'
  },
  {
    id: 'index_fund',
    name: 'Index Fund',
    description: 'Diversified market index fund with low-moderate risk',
    riskLevel: 'low',
    investmentAmount: 1000,
    potentialReturn: 80,
    potentialLoss: 50,
    probability: 80,
    educationalTip: 'Index funds provide instant diversification and typically outperform most individual stock pickers.',
    category: 'stocks'
  }
];

const RollDice: React.FC<RollDiceProps> = ({ onComplete, onReturnToGames }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<InvestmentScenario | null>(null);
  const [simulationResult, setSimulationResult] = useState<{
    success: boolean;
    returnAmount: number;
    kesEarned: number;
    message: string;
  } | null>(null);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [showPostGame, setShowPostGame] = useState(false);
  const [showScenarioSelection, setShowScenarioSelection] = useState(true);

  const selectScenario = (scenario: InvestmentScenario) => {
    setSelectedScenario(scenario);
    setShowScenarioSelection(false);
  };

  const runSimulation = () => {
    if (isSimulating || !selectedScenario) return;

    setIsSimulating(true);
    setSimulationResult(null);
    setHasSimulated(false);

    // Simulate investment outcome based on probability
    setTimeout(() => {
      const random = Math.random() * 100;
      const success = random <= selectedScenario.probability;
      
      let returnAmount: number;
      let kesEarned: number;
      let message: string;

      if (success) {
        // Calculate return based on risk level
        const returnPercentage = selectedScenario.potentialReturn / selectedScenario.investmentAmount;
        returnAmount = Math.floor(selectedScenario.investmentAmount * (1 + returnPercentage * 0.1));
        kesEarned = Math.floor(returnAmount * 0.1); // Convert to KES reward
        message = `Great investment decision! Your ${selectedScenario.name} investment was successful.`;
      } else {
        // Calculate loss based on risk level
        const lossPercentage = selectedScenario.potentialLoss / selectedScenario.investmentAmount;
        returnAmount = Math.floor(selectedScenario.investmentAmount * (1 - lossPercentage * 0.1));
        kesEarned = Math.max(5, Math.floor(returnAmount * 0.05)); // Minimum 5 KES for learning
        message = `Investment didn't work out this time, but you learned valuable risk management lessons.`;
      }

      setSimulationResult({
        success,
        returnAmount,
        kesEarned,
        message
      });
      setHasSimulated(true);
      setIsSimulating(false);
    }, 2000);
  };

  const handleComplete = () => {
    if (simulationResult) {
      onComplete(simulationResult.kesEarned);
      setShowPostGame(true);
    }
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setHasSimulated(false);
    setSimulationResult(null);
    setSelectedScenario(null);
    setShowScenarioSelection(true);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  // Show post-game interface if reward was collected
  if (showPostGame && simulationResult) {
    return (
      <PostGameInterface
        gameName="Investment Risk Simulator"
        kesEarned={simulationResult.kesEarned}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Investment Risk Simulator</h3>
        <p className="text-gray-400">
          Learn about investment risk management through real scenarios!
        </p>
      </div>

      {/* Scenario Selection */}
      {showScenarioSelection && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-white">Choose an Investment Scenario:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {INVESTMENT_SCENARIOS.map((scenario) => (
              <motion.button
                key={scenario.id}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left transition-colors border border-gray-600"
                onClick={() => selectScenario(scenario)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white">{scenario.name}</h5>
                  <span className={`text-sm font-medium ${getRiskColor(scenario.riskLevel)}`}>
                    {getRiskIcon(scenario.riskLevel)} {scenario.riskLevel.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{scenario.description}</p>
                <div className="text-xs text-gray-400">
                  <div>Investment: ${scenario.investmentAmount}</div>
                  <div>Potential Return: +${scenario.potentialReturn}</div>
                  <div>Potential Loss: -${scenario.potentialLoss}</div>
                  <div>Success Rate: {scenario.probability}%</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Selected Scenario Display */}
      {selectedScenario && !hasSimulated && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">{selectedScenario.name}</h4>
              <span className={`text-sm font-medium ${getRiskColor(selectedScenario.riskLevel)}`}>
                {getRiskIcon(selectedScenario.riskLevel)} {selectedScenario.riskLevel.toUpperCase()} RISK
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-green-900/20 p-3 rounded">
                <div className="text-green-400 font-semibold">Potential Return</div>
                <div className="text-white">+${selectedScenario.potentialReturn}</div>
              </div>
              <div className="bg-red-900/20 p-3 rounded">
                <div className="text-red-400 font-semibold">Potential Loss</div>
                <div className="text-white">-${selectedScenario.potentialLoss}</div>
              </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded mb-4">
              <div className="text-blue-400 font-semibold mb-1">💡 Educational Tip:</div>
              <div className="text-sm text-gray-300">{selectedScenario.educationalTip}</div>
            </div>

            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              onClick={runSimulation}
              disabled={isSimulating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSimulating ? 'Simulating Investment...' : 'Run Investment Simulation'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Simulation Result */}
      {hasSimulated && simulationResult && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${simulationResult.success ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'} border rounded-lg p-4`}>
            <div className="text-2xl font-bold mb-2">
              {simulationResult.success ? '✅ Investment Successful!' : '❌ Investment Result'}
            </div>
            <div className="text-lg text-white mb-2">
              Final Value: ${simulationResult.returnAmount}
            </div>
            <div className="text-sm text-gray-300 mb-4">
              {simulationResult.message}
            </div>
            <div className="text-xl font-bold text-green-400">
              You earned {simulationResult.kesEarned} KES for learning!
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              className="w-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 hover:from-bitcoin-600 hover:to-bitcoin-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              onClick={() => window.open('https://app.bitsacco.com/personal', '_blank')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>💰</span>
              <span>Make Deposit to Bitsacco Account</span>
              <span>↗</span>
            </motion.button>
            
            <motion.button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              onClick={handleComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Collect Learning Reward
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-500">
        <p>📊 Choose an investment scenario to learn about risk management</p>
        <p>🎯 Higher risk = higher potential returns but also higher potential losses</p>
        <p>💡 Read the educational tips to understand each investment type</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default RollDice;
