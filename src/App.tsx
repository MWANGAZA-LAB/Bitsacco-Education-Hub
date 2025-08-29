import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import GameMenu from './components/GameMenu';
import GamePanel from './components/GamePanel';
import InlineEducationCenter from './components/InlineEducationCenter';
import './styles.css';

const App: React.FC = () => {
  const { savingsGoal, resetProgress } = useGameStore();
  const [hasSetTarget, setHasSetTarget] = useState(false);
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);

  // Check if user has set a target
  useEffect(() => {
    if (savingsGoal && savingsGoal.targetKES > 0) {
      setHasSetTarget(true);
    }
  }, [savingsGoal]);

  // Show welcome screen if target not set
  if (!hasSetTarget) {
    return <WelcomeScreen onTargetSet={() => setHasSetTarget(true)} />;
  }

  const handleReset = () => {
    resetProgress();
    setHasSetTarget(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Reset Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            🔄 Reset App
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          <div className="xl:col-span-1 order-2 xl:order-1">
            <GameMenu />
          </div>
          <div className="xl:col-span-3 order-1 xl:order-2 space-y-4 lg:space-y-6">
            <GamePanel onEducationClick={() => setIsEducationExpanded(true)} />
            <InlineEducationCenter 
              isExpanded={isEducationExpanded}
              onToggle={() => setIsEducationExpanded(!isEducationExpanded)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
