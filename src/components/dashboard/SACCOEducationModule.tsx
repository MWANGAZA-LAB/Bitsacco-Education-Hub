import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  BookOpen, 
  Play,
  Lightbulb,
  Target
} from 'lucide-react';

const SACCOEducationModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'quiz' | 'resources'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'lessons', label: 'Lessons', icon: <Play className="w-5 h-5" /> },
    { id: 'quiz', label: 'Quiz', icon: <Target className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">SACCO Education Hub</h2>
        <p className="text-gray-400 text-lg">
          Learn the history, structure, and benefits of SACCOs in Kenya and globally. 
          Build your financial literacy foundation.
        </p>
      </div>

      {/* Knowledge Nugget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-3">
          <Lightbulb className="w-6 h-6 text-yellow-300" />
          <h3 className="text-xl font-semibold text-white">💡 SACCO Wisdom</h3>
        </div>
        <p className="text-white text-lg">
          "SACCOs in Kenya started in the 1960s to help workers save and borrow affordably. 
          Globally, similar systems exist because community power beats individual struggle."
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-102'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4">SACCO Learning Path</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">History of SACCOs in Kenya</h4>
                    <p className="text-gray-400 text-sm">Learn how SACCOs evolved from the 1960s</p>
                  </div>
                  <div className="text-sm text-gray-400">15 min</div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Global SACCO Systems</h4>
                    <p className="text-gray-400 text-sm">Discover similar systems worldwide</p>
                  </div>
                  <div className="text-sm text-gray-400">20 min</div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Benefits of SACCO Membership</h4>
                    <p className="text-gray-400 text-sm">Understand advantages over traditional banking</p>
                  </div>
                  <div className="text-sm text-gray-400">25 min</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'lessons' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">SACCO Education Lessons</h3>
            <p className="text-gray-400">Coming soon - Interactive lessons on SACCO foundations</p>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">SACCO Knowledge Quiz</h3>
            <p className="text-gray-400">Coming soon - Test your SACCO knowledge</p>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Additional Resources</h3>
            <p className="text-gray-400">Coming soon - SACCO guides and tools</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SACCOEducationModule;
