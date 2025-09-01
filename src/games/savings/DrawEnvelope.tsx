import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface EmergencyScenario {
  id: string;
  name: string;
  description: string;
  cost: number;
  urgency: 'low' | 'medium' | 'high';
  category: 'medical' | 'car' | 'job_loss' | 'home_repair' | 'family';
  recommendedSavings: number;
  educationalContent: string;
  impact: string;
}

interface DrawEnvelopeProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
}

const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: 'medical_emergency',
    name: 'Medical Emergency',
    description: 'Unexpected health issue requiring immediate attention',
    cost: 2500,
    urgency: 'high',
    category: 'medical',
    recommendedSavings: 5000,
    educationalContent: 'Medical emergencies are the most common unexpected expenses. Having an emergency fund can prevent debt and reduce stress during health crises.',
    impact: 'Without emergency savings, medical bills often lead to credit card debt or delayed treatment.'
  },
  {
    id: 'car_repair',
    name: 'Car Breakdown',
    description: 'Vehicle repair needed for daily transportation',
    cost: 800,
    urgency: 'medium',
    category: 'car',
    recommendedSavings: 2000,
    educationalContent: 'Car repairs are frequent unexpected expenses. Regular maintenance can reduce costs, but major repairs are often unavoidable.',
    impact: 'Car issues can affect your ability to work and earn income, making emergency funds crucial.'
  },
  {
    id: 'job_loss',
    name: 'Job Loss',
    description: 'Unexpected unemployment requiring financial support',
    cost: 3000,
    urgency: 'high',
    category: 'job_loss',
    recommendedSavings: 15000,
    educationalContent: 'Job loss can happen to anyone. Experts recommend 3-6 months of living expenses in emergency savings.',
    impact: 'Without emergency savings, job loss can lead to immediate financial crisis and debt accumulation.'
  },
  {
    id: 'home_repair',
    name: 'Home Repair',
    description: 'Essential home maintenance or repair needed',
    cost: 1200,
    urgency: 'medium',
    category: 'home_repair',
    recommendedSavings: 3000,
    educationalContent: 'Home repairs are inevitable. Regular maintenance prevents larger, more expensive problems later.',
    impact: 'Delaying home repairs often leads to more expensive problems and potential safety issues.'
  },
  {
    id: 'family_emergency',
    name: 'Family Emergency',
    description: 'Family member needs financial assistance',
    cost: 1500,
    urgency: 'high',
    category: 'family',
    recommendedSavings: 4000,
    educationalContent: 'Family emergencies often require immediate financial support. Having savings helps you help others without jeopardizing your own finances.',
    impact: 'Family emergencies can strain relationships and finances if you\'re not prepared.'
  },
  {
    id: 'appliance_failure',
    name: 'Appliance Failure',
    description: 'Essential household appliance breaks down',
    cost: 600,
    urgency: 'low',
    category: 'home_repair',
    recommendedSavings: 1500,
    educationalContent: 'Appliances have limited lifespans. Planning for replacements prevents financial stress when they fail.',
    impact: 'Broken appliances can affect daily life and work productivity, making quick replacement important.'
  }
];

const DrawEnvelope: React.FC<DrawEnvelopeProps> = ({ onComplete, onReturnToGames }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);
  const [simulationResult, setSimulationResult] = useState<{
    hasEmergencyFund: boolean;
    emergencyFundAmount: number;
    outcome: 'covered' | 'partial' | 'uncovered';
    kesEarned: number;
    message: string;
    lesson: string;
  } | null>(null);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [showPostGame, setShowPostGame] = useState(false);
  const [showScenarioSelection, setShowScenarioSelection] = useState(true);

  const selectScenario = (scenario: EmergencyScenario) => {
    setSelectedScenario(scenario);
    setShowScenarioSelection(false);
  };

  const runEmergencySimulation = () => {
    if (isSimulating || !selectedScenario) return;

    setIsSimulating(true);
    setSimulationResult(null);
    setHasSimulated(false);

    // Simulate emergency fund scenario
    setTimeout(() => {
      // Random emergency fund amount (0 to 2x recommended)
      const emergencyFundAmount = Math.floor(Math.random() * (selectedScenario.recommendedSavings * 2));
      const hasEmergencyFund = emergencyFundAmount > 0;
      
      let outcome: 'covered' | 'partial' | 'uncovered';
      let kesEarned: number;
      let message: string;
      let lesson: string;

      if (emergencyFundAmount >= selectedScenario.cost) {
        outcome = 'covered';
        kesEarned = Math.floor(selectedScenario.cost * 0.1); // 10% of cost as reward
        message = `Excellent! Your emergency fund of $${emergencyFundAmount} fully covers the $${selectedScenario.cost} expense.`;
        lesson = 'Having a well-funded emergency fund provides peace of mind and prevents debt.';
      } else if (emergencyFundAmount > 0) {
        outcome = 'partial';
        kesEarned = Math.floor(emergencyFundAmount * 0.08); // 8% of fund as reward
        message = `Your emergency fund of $${emergencyFundAmount} covers ${Math.round((emergencyFundAmount / selectedScenario.cost) * 100)}% of the $${selectedScenario.cost} expense.`;
        lesson = 'Partial coverage is better than none, but aim to build a larger emergency fund.';
      } else {
        outcome = 'uncovered';
        kesEarned = 5; // Minimum reward for learning
        message = `You have no emergency fund to cover the $${selectedScenario.cost} expense.`;
        lesson = 'Without emergency savings, unexpected expenses often lead to debt or financial crisis.';
      }

      setSimulationResult({
        hasEmergencyFund,
        emergencyFundAmount,
        outcome,
        kesEarned,
        message,
        lesson
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical': return '🏥';
      case 'car': return '🚗';
      case 'job_loss': return '💼';
      case 'home_repair': return '🏠';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '⚠️';
    }
  };

  // Show post-game interface if reward was collected
  if (showPostGame && simulationResult) {
    return (
      <PostGameInterface
        gameName="Emergency Fund Builder"
        kesEarned={simulationResult.kesEarned}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Emergency Fund Builder</h3>
        <p className="text-gray-400">
          Learn why emergency funds are crucial through real-world scenarios!
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
          <h4 className="text-lg font-semibold text-white">Choose an Emergency Scenario:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {EMERGENCY_SCENARIOS.map((scenario) => (
              <motion.button
                key={scenario.id}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left transition-colors border border-gray-600"
                onClick={() => selectScenario(scenario)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(scenario.category)}</span>
                    <h5 className="font-semibold text-white">{scenario.name}</h5>
                  </div>
                  <span className={`text-sm font-medium ${getUrgencyColor(scenario.urgency)}`}>
                    {getUrgencyIcon(scenario.urgency)} {scenario.urgency.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{scenario.description}</p>
                <div className="text-xs text-gray-400">
                  <div>Cost: ${scenario.cost}</div>
                  <div>Recommended Savings: ${scenario.recommendedSavings}</div>
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
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(selectedScenario.category)}</span>
                <h4 className="text-lg font-semibold text-white">{selectedScenario.name}</h4>
              </div>
              <span className={`text-sm font-medium ${getUrgencyColor(selectedScenario.urgency)}`}>
                {getUrgencyIcon(selectedScenario.urgency)} {selectedScenario.urgency.toUpperCase()} URGENCY
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-red-900/20 p-3 rounded">
                <div className="text-red-400 font-semibold">Emergency Cost</div>
                <div className="text-white">${selectedScenario.cost}</div>
              </div>
              <div className="bg-green-900/20 p-3 rounded">
                <div className="text-green-400 font-semibold">Recommended Savings</div>
                <div className="text-white">${selectedScenario.recommendedSavings}</div>
              </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded mb-4">
              <div className="text-blue-400 font-semibold mb-1">💡 Why This Matters:</div>
              <div className="text-sm text-gray-300">{selectedScenario.educationalContent}</div>
            </div>

            <div className="bg-yellow-900/20 p-3 rounded mb-4">
              <div className="text-yellow-400 font-semibold mb-1">⚠️ Impact Without Savings:</div>
              <div className="text-sm text-gray-300">{selectedScenario.impact}</div>
            </div>

            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              onClick={runEmergencySimulation}
              disabled={isSimulating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSimulating ? 'Simulating Emergency...' : 'Run Emergency Scenario'}
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
          <div className={`${
            simulationResult.outcome === 'covered' ? 'bg-green-900/20 border-green-500/30' :
            simulationResult.outcome === 'partial' ? 'bg-yellow-900/20 border-yellow-500/30' :
            'bg-red-900/20 border-red-500/30'
          } border rounded-lg p-4`}>
            <div className="text-2xl font-bold mb-2">
              {simulationResult.outcome === 'covered' ? '✅ Fully Covered!' :
               simulationResult.outcome === 'partial' ? '⚠️ Partially Covered' :
               '❌ Not Covered'}
            </div>
            <div className="text-lg text-white mb-2">
              Emergency Fund: ${simulationResult.emergencyFundAmount}
            </div>
            <div className="text-sm text-gray-300 mb-4">
              {simulationResult.message}
            </div>
            <div className="bg-gray-800/50 p-3 rounded mb-4">
              <div className="text-sm text-gray-300">{simulationResult.lesson}</div>
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
        <p>🏥 Choose an emergency scenario to understand the importance of emergency funds</p>
        <p>💰 See how different emergency fund amounts affect your financial security</p>
        <p>💡 Learn why emergency funds are crucial for financial stability</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default DrawEnvelope;
