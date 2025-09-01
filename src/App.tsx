import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu,
  X,
  GraduationCap,
  Gamepad2,
  Settings,
  User,
  Zap
} from 'lucide-react';
import './styles.css';

// Import components
import EducationCenter from './components/EducationCenter';
import GamePanel from './components/GamePanel';
import PersonalDashboard from './components/PersonalDashboard';
import SavingsReminder from './components/SavingsReminder';
import CourseInterface from './components/gamification/CourseInterface';

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'education' | 'games' | 'dashboard' | 'course'>('course');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'course', label: 'Learning Course', icon: <Zap className="w-5 h-5" />, primary: true },
    { id: 'education', label: 'Education Hub', icon: <GraduationCap className="w-5 h-5" />, primary: false },
    { id: 'games', label: 'Interactive Tools', icon: <Gamepad2 className="w-5 h-5" />, primary: false },
    { id: 'dashboard', label: 'Personal Dashboard', icon: <User className="w-5 h-5" />, primary: false },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'course':
        return <CourseInterface />;
      case 'education':
        return <EducationCenter />;
      case 'games':
        return <GamePanel />;
      case 'dashboard':
        return <PersonalDashboard />;
      default:
        return <CourseInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Bitsacco</h1>
                  <p className="text-xs text-gray-400">Financial Education Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden lg:flex space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  } ${item.primary ? 'ring-2 ring-blue-500/30' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative">
        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
        
        {/* Savings Reminder - Subtle integration */}
        <div className="fixed bottom-4 right-4 z-40">
          <SavingsReminder />
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

// Simple Flame icon component
const Flame: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-1.5 0-3 1-4 2.5C6.5 6 6 7.5 6 9c0 1.5.5 3 1.5 4.5C8.5 15 9 16.5 9 18c0 1.5.5 3 1.5 4.5C11.5 24 12 25.5 12 27c0-1.5.5-3 1.5-4.5C14.5 21 15 19.5 15 18c0-1.5.5-3 1.5-4.5C17 12 18 10.5 18 9c0-1.5-1-3-2.5-4.5C14.5 3 13 2 12 2z"/>
  </svg>
);

export default App;
