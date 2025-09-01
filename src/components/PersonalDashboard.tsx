import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Download,
  Share2
} from 'lucide-react';

import DashboardOverview from './dashboard/DashboardOverview';
import DashboardGoals from './dashboard/DashboardGoals';
import DashboardTools from './dashboard/DashboardTools';
import { useDashboard } from '../hooks/useDashboard';

const PersonalDashboard: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    dashboardTabs, 
    dashboardTools,
    financialGoals,
    financialMetrics,
    refreshUserData 
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Learning Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Track your learning progress, achievements, and financial education journey. 
            Monitor your growth and celebrate your milestones.
          </p>
        </motion.div>

        {/* Learning Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Courses */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Courses</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            {/* Completed Courses */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>

            {/* Learning Hours */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Learning Hours</p>
                  <p className="text-3xl font-bold">12.5</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            {/* Certificates Earned */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Certificates</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <Award className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span>Recent Achievements</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">SACCO Foundations</h3>
                    <p className="text-gray-400 text-sm">Course Completed</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Earned your first certificate in SACCO operations and governance.</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-blue-100 font-medium">Learning Streak</h3>
                    <p className="text-gray-400 text-sm">7 Days</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Maintained consistent learning for 7 consecutive days.</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Financial Goals</h3>
                    <p className="text-gray-400 text-sm">3 Goals Set</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Estimated completion</p>
                    <p className="text-white font-medium">March 25, 2024</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">Successfully set and started tracking 3 financial goals.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px]"
        >
          {activeTab === 'overview' && (
            <DashboardOverview 
              financialMetrics={financialMetrics}
              financialGoals={financialGoals}
              userProgress={0}
              savingsGoal={0}
              onMetricsUpdate={refreshUserData} 
            />
          )}
          
          {activeTab === 'goals' && (
            <DashboardGoals 
              goals={financialGoals}
              onGoalsChange={refreshUserData} 
            />
          )}
          
          {activeTab === 'tools' && (
            <DashboardTools 
              tools={dashboardTools}
              onToolClick={(toolId) => console.log('Tool clicked:', toolId)}
            />
          )}
          
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Learning Progress</h3>
                <div className="space-y-4">
                  {/* Course Progress Bars */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">SACCO Foundations</span>
                      <span className="text-gray-400">100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Chama Dynamics</span>
                      <span className="text-gray-400">75%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Bitcoin Literacy</span>
                      <span className="text-gray-400">45%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Investment Principles</span>
                      <span className="text-gray-400">20%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Calendar */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Learning Calendar</h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                        i < 20 ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Green squares indicate days with learning activity
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Earned Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">SACCO Foundations</h4>
                      <Award className="w-6 h-6 text-yellow-300" />
                    </div>
                    <p className="text-blue-100 text-sm mb-4">Completed on March 15, 2024</p>
                    <div className="flex space-x-2">
                      <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-600 transition-colors flex items-center space-x-1">
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Personal Finance Mastery</h4>
                      <Award className="w-6 h-6 text-yellow-300" />
                    </div>
                    <p className="text-green-100 text-sm mb-4">Completed on March 10, 2024</p>
                    <div className="flex space-x-2">
                      <button className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center space-x-1">
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming Certificates</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Chama Dynamics</h4>
                      <p className="text-gray-400 text-sm">75% complete - 2 lessons remaining</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Estimated completion</p>
                      <p className="text-white font-medium">March 25, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Bitcoin Literacy</h4>
                      <p className="text-gray-400 text-sm">45% complete - 4 lessons remaining</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Estimated completion</p>
                      <p className="text-white font-medium">April 5, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
