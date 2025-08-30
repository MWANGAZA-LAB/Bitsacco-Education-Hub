import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import Header from './components/Header';
import Layout from './components/Layout';
import GameMenu from './components/GameMenu';
import GamePanel from './components/GamePanel';
import WelcomeScreen from './components/WelcomeScreen';
import EducationCenter from './components/EducationCenter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { logger } from './utils/logger';
import './styles.css';

const App: React.FC = () => {
  const { savingsGoal, currentGame, setCurrentGame } = useGameStore();
  const [showEducationCenter, setShowEducationCenter] = useState(false);

  // Log app initialization
  React.useEffect(() => {
    logger.info('App initialized', { hasSavingsGoal: !!savingsGoal });
  }, [savingsGoal]);

  // Show welcome screen if no savings goal is set
  if (!savingsGoal) {
    return (
      <ErrorBoundary>
        <WelcomeScreen 
          onTargetSet={() => {
            logger.info('Target set, transitioning to main app');
          }} 
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
          {/* Left Sidebar - Game Menu */}
          <div className="w-full lg:w-80 p-4 lg:p-6">
            <GameMenu />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4 lg:p-6">
            <AnimatePresence mode="wait">
              {currentGame ? (
                <motion.div
                  key="game-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GamePanel />
                </motion.div>
              ) : (
                <motion.div
                  key="game-hub"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  {/* Game Hub Section */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎮</div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
                      Game Hub
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Select a game from the menu to start your savings journey!
                    </p>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setCurrentGame('rollDice')}
                    >
                      <div className="text-4xl mb-4">💰</div>
                      <h3 className="text-xl font-bold text-white mb-2">Earn KES</h3>
                      <p className="text-gray-400">Play games to earn Kenyan Shillings</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setCurrentGame('rollDice')}
                    >
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-bold text-white mb-2">Hit Targets</h3>
                      <p className="text-gray-400">Achieve your monthly savings goals</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setCurrentGame('rollDice')}
                    >
                      <div className="text-4xl mb-4">🔥</div>
                      <h3 className="text-xl font-bold text-white mb-2">Keep Saving</h3>
                      <p className="text-gray-400">Build consistent savings habits</p>
                    </motion.div>
                  </div>

                  {/* Education Center Section */}
                  <div className="mt-auto">
                    <EducationCenter />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
    </ErrorBoundary>
  );
};

export default App;
