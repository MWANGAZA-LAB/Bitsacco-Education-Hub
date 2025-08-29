import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

interface EducationItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'game' | 'resource';
  url: string;
  icon: string;
}

interface EducationCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: EducationItem[];
}

const EDUCATION_CATEGORIES: EducationCategory[] = [
  {
    id: 'bitcoin-basics',
    name: 'Bitcoin Basics',
    description: 'Learn the fundamentals of Bitcoin',
    icon: '₿',
    items: [
      {
        id: 'what-is-bitcoin',
        title: 'What is Bitcoin?',
        description: 'A beginner-friendly introduction to Bitcoin',
        type: 'video',
        url: 'https://bitcoin.org/en/getting-started',
        icon: '🎥'
      },
      {
        id: 'how-bitcoin-works',
        title: 'How Bitcoin Works',
        description: 'Understanding the technology behind Bitcoin',
        type: 'article',
        url: 'https://bitcoin.org/en/how-it-works',
        icon: '📖'
      },
      {
        id: 'bitcoin-security',
        title: 'Bitcoin Security',
        description: 'Best practices for securing your Bitcoin',
        type: 'resource',
        url: 'https://bitcoin.org/en/secure-your-wallet',
        icon: '🔒'
      }
    ]
  },
  {
    id: 'savings-strategies',
    name: 'Savings Strategies',
    description: 'Effective ways to save in Bitcoin',
    icon: '💰',
    items: [
      {
        id: 'dollar-cost-averaging',
        title: 'Dollar Cost Averaging',
        description: 'A systematic approach to Bitcoin accumulation',
        type: 'article',
        url: 'https://www.investopedia.com/terms/d/dollarcostaveraging.asp',
        icon: '📈'
      },
      {
        id: 'stacking-sats',
        title: 'Stacking Sats',
        description: 'The art of accumulating small amounts of Bitcoin',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=example',
        icon: '🎯'
      },
      {
        id: 'emergency-fund',
        title: 'Emergency Fund in Bitcoin',
        description: 'Building financial resilience with Bitcoin',
        type: 'resource',
        url: 'https://bitcoin.org/en/protect-your-privacy',
        icon: '🛡️'
      }
    ]
  },
  {
    id: 'privacy-security',
    name: 'Privacy & Security',
    description: 'Protecting your Bitcoin and privacy',
    icon: '🔐',
    items: [
      {
        id: 'wallet-security',
        title: 'Wallet Security',
        description: 'How to keep your Bitcoin safe',
        type: 'video',
        url: 'https://bitcoin.org/en/secure-your-wallet',
        icon: '💼'
      },
      {
        id: 'privacy-basics',
        title: 'Privacy Basics',
        description: 'Understanding Bitcoin privacy',
        type: 'article',
        url: 'https://bitcoin.org/en/protect-your-privacy',
        icon: '🕵️'
      },
      {
        id: 'cold-storage',
        title: 'Cold Storage',
        description: 'Offline Bitcoin storage methods',
        type: 'resource',
        url: 'https://bitcoin.org/en/secure-your-wallet',
        icon: '❄️'
      }
    ]
  }
];

interface InlineEducationCenterProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const InlineEducationCenter: React.FC<InlineEducationCenterProps> = ({
  isExpanded,
  onToggle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);

  const handleSelectCategory = (category: EducationCategory) => {
    setSelectedCategory(category);
  };

  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [showContentViewer, setShowContentViewer] = useState(false);

  const handleSelectItem = (item: EducationItem) => {
    setSelectedItem(item);
    setShowContentViewer(true);
  };

  const handleCloseContentViewer = () => {
    setShowContentViewer(false);
    setSelectedItem(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'game':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4 lg:p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 mb-4">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education Center
            </h3>
            <p className="text-xs lg:text-sm text-gray-400">Learn Bitcoin & Savings Strategies</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors self-start lg:self-auto"
          aria-label={isExpanded ? 'Collapse Education Center' : 'Expand Education Center'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5" /> : <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EDUCATION_CATEGORIES.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gray-800/50 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedCategory?.id === category.id
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-gray-600 hover:border-blue-500/50'
                    }`}
                    onClick={() => handleSelectCategory(category)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h4 className="font-semibold text-gray-200">{category.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Selected Category Items */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800/30 rounded-lg p-6 border border-gray-600"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{selectedCategory.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200">{selectedCategory.name}</h4>
                      <p className="text-sm text-gray-400">{selectedCategory.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCategory.items.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500/50 transition-all duration-200"
                        onClick={() => handleSelectItem(item)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg">{item.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-200">{item.title}</h5>
                          </div>
                          {getTypeIcon(item.type)}
                        </div>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => window.open('https://bitcoin.org', '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    🌐 Bitcoin.org
                  </button>
                  <button
                    onClick={() => window.open('https://bitsacco.com', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    💰 Bitsacco
                  </button>
                  <button
                    onClick={() => window.open('https://www.youtube.com/results?search_query=bitcoin+education', '_blank')}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    📺 Videos
                  </button>
                  <button
                    onClick={() => window.open('https://bitcoin.org/en/faq', '_blank')}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    ❓ FAQ
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
                 )}
       </AnimatePresence>

       {/* Content Viewer Modal */}
       <AnimatePresence>
         {showContentViewer && selectedItem && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
             onClick={handleCloseContentViewer}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Header */}
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center space-x-3">
                   <span className="text-2xl">{selectedItem.icon}</span>
                   <div>
                     <h3 className="text-xl font-bold text-gray-200">{selectedItem.title}</h3>
                     <p className="text-sm text-gray-400">{selectedItem.description}</p>
                   </div>
                 </div>
                 <button
                   onClick={handleCloseContentViewer}
                   className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                   aria-label="Close content viewer"
                 >
                   ✕
                 </button>
               </div>

               {/* Content */}
               <div className="space-y-4">
                 {selectedItem.type === 'video' && (
                   <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                     <div className="text-center">
                       <div className="text-6xl mb-4">🎥</div>
                       <p className="text-gray-400 mb-4">Video content would be embedded here</p>
                       <button
                         onClick={() => window.open(selectedItem.url, '_blank')}
                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                       >
                         Watch on External Site
                       </button>
                     </div>
                   </div>
                 )}

                 {selectedItem.type === 'article' && (
                   <div className="bg-gray-900 rounded-lg p-6">
                     <div className="prose prose-invert max-w-none">
                       <h4 className="text-lg font-semibold text-gray-200 mb-4">Article Preview</h4>
                       <p className="text-gray-300 mb-4">
                         This is a preview of the article content. The full article would be embedded here with proper formatting, images, and interactive elements.
                       </p>
                       <p className="text-gray-300 mb-4">
                         Users can read the complete content without leaving the app, maintaining engagement and providing a seamless learning experience.
                       </p>
                       <button
                         onClick={() => window.open(selectedItem.url, '_blank')}
                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                       >
                         Read Full Article
                       </button>
                     </div>
                   </div>
                 )}

                 {selectedItem.type === 'resource' && (
                   <div className="bg-gray-900 rounded-lg p-6">
                     <div className="text-center">
                       <div className="text-6xl mb-4">📚</div>
                       <h4 className="text-lg font-semibold text-gray-200 mb-4">Resource Center</h4>
                       <p className="text-gray-300 mb-4">
                         Interactive resource content would be displayed here, including guides, tutorials, and educational materials.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <button
                           onClick={() => window.open(selectedItem.url, '_blank')}
                           className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                         >
                           View Resource
                         </button>
                         <button
                           onClick={() => window.open(selectedItem.url, '_blank')}
                           className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                         >
                           Download Guide
                         </button>
                       </div>
                     </div>
                   </div>
                 )}

                 {selectedItem.type === 'game' && (
                   <div className="bg-gray-900 rounded-lg p-6">
                     <div className="text-center">
                       <div className="text-6xl mb-4">🎮</div>
                       <h4 className="text-lg font-semibold text-gray-200 mb-4">Interactive Game</h4>
                       <p className="text-gray-300 mb-4">
                         Educational game content would be embedded here, providing interactive learning experiences.
                       </p>
                       <button
                         onClick={() => window.open(selectedItem.url, '_blank')}
                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                       >
                         Play Game
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 };

export default InlineEducationCenter;
