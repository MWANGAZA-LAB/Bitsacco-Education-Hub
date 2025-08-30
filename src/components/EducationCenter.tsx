import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUp } from 'lucide-react';

const EducationCenter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const educationCategories = [
    {
      title: 'B Bitcoin Basics',
      subtitle: 'Learn the fundamentals of Bitcoin.',
      icon: '₿',
      items: [
        { title: 'What is Bitcoin?', description: 'A beginner-friendly introduction to Bitcoin.', icon: '📹' },
        { title: 'How Bitcoin Works', description: 'Understanding the technology behind Bitcoin.', icon: '📄' },
        { title: 'Bitcoin Security', description: 'Best practices for securing your Bitcoin.', icon: '🔒' }
      ]
    },
    {
      title: 'Savings Strategies',
      subtitle: 'Effective ways to save in Bitcoin.',
      icon: '💰',
      items: [
        { title: 'Dollar Cost Averaging', description: 'Learn about DCA strategy.', icon: '📈' },
        { title: 'Cold Storage', description: 'Secure your Bitcoin offline.', icon: '❄️' },
        { title: 'Portfolio Management', description: 'Balance your investments.', icon: '⚖️' }
      ]
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Protecting your Bitcoin and privacy.',
      icon: '🔒',
      items: [
        { title: 'Privacy Basics', description: 'Understanding Bitcoin privacy.', icon: '🕵️' },
        { title: 'Hardware Wallets', description: 'Secure storage solutions.', icon: '💳' },
        { title: 'Best Practices', description: 'Security guidelines.', icon: '✅' }
      ]
    }
  ];

  return (
    <div className="bg-blue-600 rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white">Education Center</h3>
            <p className="text-blue-100 text-sm">Learn Bitcoin & Savings Strategies</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <ArrowUp className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {/* First Row - Main Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {educationCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-700 rounded-lg p-4 hover:bg-blue-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h4 className="font-semibold text-white">{category.title}</h4>
                    </div>
                    <p className="text-blue-200 text-sm">{category.subtitle}</p>
                  </motion.div>
                ))}
              </div>

              {/* Second Row - Bitcoin Basics Expanded */}
              <div className="bg-blue-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">₿</span>
                  <div>
                    <h4 className="font-semibold text-white">B Bitcoin Basics</h4>
                    <p className="text-blue-200 text-sm">Learn the fundamentals of Bitcoin.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {educationCategories[0].items.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-blue-800 rounded-lg p-3 hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <h5 className="font-medium text-white text-sm">{item.title}</h5>
                      </div>
                      <p className="text-blue-200 text-xs">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <span>🌐</span>
                  <span>Bitcoin.org</span>
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <span>🔥</span>
                  <span>Bitsacco</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <span>📹</span>
                  <span>Videos</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                  <span>❓</span>
                  <span>FAQ</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationCenter;
