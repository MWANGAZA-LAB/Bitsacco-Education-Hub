import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Zap, 
  Flame,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { gamificationLevels } from '../../data/gamificationData';
import LessonInterface from './LessonInterface';
import ProgressTracker from './ProgressTracker';
import DailyReminder from './DailyReminder';

type ViewMode = 'course-map' | 'lesson' | 'progress';

const CourseInterface: React.FC = () => {
  const { 
    currentLevel, 
    totalXP, 
    currentStreak, 
    completedLessons
  } = useGamificationStore();
  
  const [currentView, setCurrentView] = useState<ViewMode>('course-map');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const handleLessonClick = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('lesson');
  };

  const handleLessonComplete = () => {
    setCurrentView('course-map');
    setSelectedLessonId(null);
  };

  const handleBackToCourse = () => {
    setCurrentView('course-map');
    setSelectedLessonId(null);
  };

  const renderCourseMap = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Bitsacco Learning Journey</h1>
          <p className="text-gray-400 text-lg">Master financial literacy through interactive lessons</p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">Level {currentLevel}</div>
              <div className="text-gray-400 text-sm">Current Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">{totalXP}</div>
              <div className="text-gray-400 text-sm">Total XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-2">{currentStreak}</div>
              <div className="text-gray-400 text-sm">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-2">{completedLessons.length}</div>
              <div className="text-gray-400 text-sm">Lessons Done</div>
            </div>
          </div>
        </div>

        {/* Course Levels */}
        <div className="space-y-8">
          {gamificationLevels.map((level, levelIndex) => {
            const isUnlocked = level.unlocked;
            const isCompleted = level.completed;
            const completedLessonsInLevel = level.lessons.filter(lesson => 
              completedLessons.includes(lesson.id)
            ).length;
            const progress = (completedLessonsInLevel / level.lessons.length) * 100;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: levelIndex * 0.1 }}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
              >
                {/* Level Header */}
                <div className={`p-6 ${level.color} bg-opacity-20`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{level.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{level.name}</h3>
                        <p className="text-gray-300">{level.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{level.id}</div>
                      <div className="text-sm text-gray-300">Level</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">
                      {completedLessonsInLevel} of {level.lessons.length} lessons
                    </span>
                    <span className="text-gray-300 text-sm">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {level.lessons.map((lesson, lessonIndex) => {
                      const isLessonCompleted = completedLessons.includes(lesson.id);
                      const isLessonUnlocked = isUnlocked && (
                        lessonIndex === 0 || 
                        completedLessons.includes(level.lessons[lessonIndex - 1].id)
                      );

                      return (
                        <motion.button
                          key={lesson.id}
                          whileHover={{ scale: isLessonUnlocked ? 1.05 : 1 }}
                          whileTap={{ scale: isLessonUnlocked ? 0.95 : 1 }}
                          onClick={() => isLessonUnlocked && handleLessonClick(lesson.id)}
                          disabled={!isLessonUnlocked}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            isLessonCompleted
                              ? 'border-green-500 bg-green-500/20'
                              : isLessonUnlocked
                              ? 'border-blue-500 bg-blue-500/20 hover:bg-blue-500/30'
                              : 'border-gray-600 bg-gray-700/50 cursor-not-allowed'
                          }`}
                        >
                          {/* Lesson Status Icon */}
                          <div className="absolute top-2 right-2">
                            {isLessonCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : isLessonUnlocked ? (
                              <Play className="w-6 h-6 text-blue-400" />
                            ) : (
                              <Lock className="w-6 h-6 text-gray-500" />
                            )}
                          </div>

                          {/* Lesson Content */}
                          <div className="text-center">
                            <div className="text-3xl mb-2">{lesson.emoji}</div>
                            <h4 className="font-semibold text-white mb-1">{lesson.title}</h4>
                            <p className="text-sm text-gray-400 mb-3">{lesson.content}</p>
                            
                            {/* XP Reward */}
                            <div className="flex items-center justify-center space-x-2 text-yellow-400">
                              <Zap className="w-4 h-4" />
                              <span className="text-sm font-medium">{lesson.xpReward} XP</span>
                            </div>

                            {/* Streak Bonus */}
                            {lesson.streakBonus > 0 && (
                              <div className="flex items-center justify-center space-x-2 text-orange-400 mt-1">
                                <Flame className="w-4 h-4" />
                                <span className="text-xs">+{lesson.streakBonus} bonus</span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Level Completion */}
                {isCompleted && (
                  <div className="bg-green-500/20 border-t border-green-500/30 p-4">
                    <div className="flex items-center justify-center space-x-3 text-green-400">
                      <Trophy className="w-6 h-6" />
                      <span className="font-semibold">Level Complete!</span>
                      <Trophy className="w-6 h-6" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentView('progress')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <TrendingUp className="w-5 h-5" />
            <span>View Progress</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'course-map':
        return renderCourseMap();
      case 'lesson':
        return selectedLessonId ? (
          <LessonInterface
            lessonId={selectedLessonId}
            onComplete={handleLessonComplete}
            onBack={handleBackToCourse}
          />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
              <button onClick={handleBackToCourse} className="bg-blue-600 px-4 py-2 rounded-lg">
                Back to Course
              </button>
            </div>
          </div>
        );
      case 'progress':
        return <ProgressTracker />;
      default:
        return renderCourseMap();
    }
  };

  return (
    <div className="relative">
      {renderCurrentView()}
      
      {/* Daily Reminder */}
      <DailyReminder />
    </div>
  );
};

export default CourseInterface;
