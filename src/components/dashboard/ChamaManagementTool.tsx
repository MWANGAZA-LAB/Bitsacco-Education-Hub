import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Calculator, 
  Calendar,
  BarChart3,
  Lightbulb
} from 'lucide-react';

const ChamaManagementTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'projects' | 'meetings' | 'calculator'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'members', label: 'Members', icon: <Users className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <Target className="w-5 h-5" /> },
    { id: 'meetings', label: 'Meetings', icon: <Calendar className="w-5 h-5" /> },
    { id: 'calculator', label: 'Calculator', icon: <Calculator className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Chama Management Tool</h2>
        <p className="text-gray-400 text-lg">
          "1 person saves = a drop. 10 people save = a river." 
          Manage your chama, track projects, and build collective wealth.
        </p>
      </div>

      {/* Knowledge Nugget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-3">
          <Lightbulb className="w-6 h-6 text-yellow-300" />
          <h3 className="text-xl font-semibold text-white">💡 Chama Wisdom</h3>
        </div>
        <p className="text-white text-lg">
          "Chamas help members achieve dreams faster through pooling resources. 
          Collective wealth = land buying, business startups, emergency support. 
          Together, small inputs → big outputs."
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
              <h3 className="text-xl font-semibold text-white mb-4">Chama Overview</h3>
              <p className="text-gray-300">Coming soon - Comprehensive chama management features</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Chama Members</h3>
            <p className="text-gray-400">Coming soon - Member management and tracking</p>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Chama Projects</h3>
            <p className="text-gray-400">Coming soon - Project planning and tracking</p>
          </motion.div>
        )}

        {activeTab === 'meetings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Chama Meetings</h3>
            <p className="text-gray-400">Coming soon - Meeting scheduling and minutes</p>
          </motion.div>
        )}

        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white">Chama Financial Calculator</h3>
            <p className="text-gray-400">Coming soon - Financial planning tools</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChamaManagementTool; 