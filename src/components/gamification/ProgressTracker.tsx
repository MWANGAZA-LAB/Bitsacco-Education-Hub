import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Flame, 
  Zap, 
  TrendingUp,
  CheckCircle,
  BarChart3,
  Crown
} from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { Badge, LeaderboardEntry } from '../../types/gamification';
import { gamificationLevels } from '../../data/gamificationData';

const ProgressTracker: React.FC = () => {
  const { 
    currentLevel, 
    totalXP, 
    currentStreak, 
    longestStreak, 
    userBadges, 
    userProgress,
    dailyGoal,
    dailyProgress
  } = useGamificationStore();
  
  const badges = userBadges;
  const completedLessons = userProgress.completedLessons;

  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'leaderboard' | 'stats'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'badges', label: 'Badges', icon: <Award className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { id: 'stats', label: 'Statistics', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  // Mock leaderboard data
  const mockLeaderboard: LeaderboardEntry[] = [
    { userId: '1', username: 'SavingsMaster', avatar: '👑', totalXP: 1250, currentStreak: 15, longestStreak: 20, level: 5, rank: 1 },
    { userId: '2', username: 'BitcoinPro', avatar: '🟧', totalXP: 980, currentStreak: 8, longestStreak: 12, level: 4, rank: 2 },
    { userId: '3', username: 'MoneyWizard', avatar: '💰', totalXP: 750, currentStreak: 5, longestStreak: 10, level: 3, rank: 3 },
    { userId: '4', username: 'ChamaChampion', avatar: '👥', totalXP: 600, currentStreak: 3, longestStreak: 7, level: 2, rank: 4 },
    { userId: '5', username: 'SACCOStar', avatar: '🏦', totalXP: 450, currentStreak: 2, longestStreak: 5, level: 2, rank: 5 }
  ];

  const currentLevelData = gamificationLevels.find(level => level.id === currentLevel);
  const nextLevelData = gamificationLevels.find(level => level.id === currentLevel + 1);
  
  const currentLevelProgress = currentLevelData ? 
    (completedLessons.filter((lessonId: string) => 
      currentLevelData.lessons.some(lesson => lesson.id === lessonId)
    ).length / currentLevelData.lessons.length) * 100 : 0;

  const xpToNextLevel = nextLevelData ? nextLevelData.requiredXP - totalXP : 0;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Level Progress */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Current Level</h3>
          <div className="text-3xl font-bold text-blue-400">Level {currentLevel}</div>
        </div>
        
        {currentLevelData && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{currentLevelData.name}</span>
              <span className="text-gray-400">{Math.round(currentLevelProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{currentLevelData.description}</p>
          </div>
        )}

        {nextLevelData && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Next Level: {nextLevelData.name}</span>
              <span className="text-blue-400">{xpToNextLevel} XP needed</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalXP / nextLevelData.requiredXP) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* XP and Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Total XP</h3>
          </div>
          <div className="text-4xl font-bold text-yellow-400 mb-2">{totalXP}</div>
          <p className="text-gray-400">Experience Points Earned</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
                            <Flame className="w-8 h-8 text-orange-400" />
            <h3 className="text-xl font-semibold text-white">Current Streak</h3>
          </div>
          <div className="text-4xl font-bold text-orange-400 mb-2">{currentStreak}</div>
          <p className="text-gray-400">Days in a Row</p>
        </div>
      </div>

      {/* Daily Goal Progress */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Daily Goal</h3>
          <div className="text-2xl font-bold text-green-400">{dailyProgress}/{dailyGoal} XP</div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((dailyProgress / dailyGoal) * 100, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">Keep your streak alive!</span>
          <span className="text-sm text-gray-400">{dailyGoal - dailyProgress} XP to go</span>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {badges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <div className="text-2xl">{badge.emoji}</div>
              <div className="flex-1">
                <div className="font-medium text-white">{badge.name}</div>
                <div className="text-sm text-gray-400">{badge.description}</div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          ))}
          {badges.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Award className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Complete lessons to earn your first badge!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Your Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge: Badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 rounded-lg p-4 text-center border-2 border-green-500"
            >
              <div className="text-4xl mb-3">{badge.emoji}</div>
              <h4 className="font-semibold text-white mb-2">{badge.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{badge.description}</p>
              <div className="text-xs text-green-400">Unlocked {badge.unlockedDate}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Available Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'streak-7', name: 'Week Warrior', emoji: '🔥', description: 'Maintain a 7-day streak', requirement: '7 days' },
            { id: 'streak-30', name: 'Month Master', emoji: '👑', description: 'Maintain a 30-day streak', requirement: '30 days' },
            { id: 'xp-1000', name: 'XP Champion', emoji: '⭐', description: 'Earn 1000 XP', requirement: '1000 XP' },
            { id: 'level-5', name: 'Level Legend', emoji: '🏆', description: 'Reach level 5', requirement: 'Level 5' },
            { id: 'perfect-lesson', name: 'Perfect Score', emoji: '💯', description: 'Complete a lesson with 100%', requirement: '100% accuracy' },
            { id: 'daily-goal', name: 'Goal Getter', emoji: '🎯', description: 'Meet daily goal 5 times', requirement: '5 days' }
          ].map((badge: any) => {
            const isUnlocked = badges.some((b: Badge) => b.id === badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={`bg-gray-700 rounded-lg p-4 text-center border-2 ${
                  isUnlocked ? 'border-green-500' : 'border-gray-600'
                }`}
              >
                <div className="text-4xl mb-3">{badge.emoji}</div>
                <h4 className="font-semibold text-white mb-2">{badge.name}</h4>
                <p className="text-sm text-gray-400 mb-3">{badge.description}</p>
                <div className="text-xs text-gray-500">Requires: {badge.requirement}</div>
                {isUnlocked && (
                  <div className="mt-2 text-green-400 text-sm">✓ Unlocked</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Top Learners</h3>
        <div className="space-y-3">
          {mockLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.userId}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30' :
                index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30' :
                index === 2 ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30' :
                'bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white font-bold">
                {index + 1}
              </div>
              <div className="text-2xl">{entry.avatar}</div>
              <div className="flex-1">
                <div className="font-medium text-white">{entry.username}</div>
                <div className="text-sm text-gray-400">Level {entry.level}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{entry.totalXP} XP</div>
                <div className="text-sm text-gray-400">🔥 {entry.currentStreak}</div>
              </div>
              {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Your Ranking</h3>
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="text-2xl font-bold text-white mb-2">Keep Learning!</div>
          <p className="text-gray-400">Complete more lessons to climb the leaderboard</p>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Learning Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Lessons Completed</span>
              <span className="text-white font-semibold">{completedLessons.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Level</span>
              <span className="text-white font-semibold">{currentLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total XP</span>
              <span className="text-white font-semibold">{totalXP}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Badges Earned</span>
              <span className="text-white font-semibold">{badges.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Streak Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Current Streak</span>
              <span className="text-white font-semibold">{currentStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Longest Streak</span>
              <span className="text-white font-semibold">{longestStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Daily Goal</span>
              <span className="text-white font-semibold">{dailyGoal} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Today's Progress</span>
              <span className="text-white font-semibold">{dailyProgress} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Progress Timeline</h3>
        <div className="space-y-3">
          {completedLessons.slice(-5).reverse().map((lessonId: string) => {
            const lesson = gamificationLevels
              .flatMap(level => level.lessons)
              .find(l => l.id === lessonId);
            
            return (
              <div key={lessonId} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{lesson?.title || 'Lesson Completed'}</div>
                  <div className="text-sm text-gray-400">+{lesson?.xpReward || 10} XP</div>
                </div>
                <div className="text-xs text-gray-500">Today</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Your Learning Progress</h1>
          <p className="text-gray-400 text-lg">Track your achievements and keep the momentum going!</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg mx-2 mb-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {/* AnimatePresence is not imported, so this block will be removed */}
        {/* <AnimatePresence mode="wait"> */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'badges' && renderBadges()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'stats' && renderStats()}
          </motion.div>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default ProgressTracker;
