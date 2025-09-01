import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostGameInterface from '../../components/PostGameInterface';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'bitcoin_basics' | 'investment' | 'security' | 'economics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  videoUrl: string;
  quiz: QuizQuestion[];
  actionItems: ActionItem[];
  completionReward: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'research' | 'practice' | 'discussion' | 'application';
  completed: boolean;
}

interface WatchVideoProps {
  onComplete: (kesEarned: number) => void;
  onReturnToGames: () => void;
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'bitcoin_101',
    title: 'Bitcoin Basics: What is Bitcoin?',
    description: 'Learn the fundamental concepts of Bitcoin and how it works',
    category: 'bitcoin_basics',
    difficulty: 'beginner',
    duration: 8,
    videoUrl: 'https://www.youtube.com/embed/Gc2en3nHxA4',
    completionReward: 50,
    quiz: [
      {
        id: 'q1',
        question: 'What is Bitcoin?',
        options: [
          'A digital currency created by banks',
          'A decentralized digital currency',
          'A physical coin made of digital material',
          'A type of credit card'
        ],
        correctAnswer: 1,
        explanation: 'Bitcoin is a decentralized digital currency that operates without a central bank or administrator.'
      },
      {
        id: 'q2',
        question: 'Who created Bitcoin?',
        options: [
          'Satoshi Nakamoto',
          'Elon Musk',
          'Mark Zuckerberg',
          'The US Government'
        ],
        correctAnswer: 0,
        explanation: 'Bitcoin was created by an anonymous person or group using the pseudonym Satoshi Nakamoto.'
      },
      {
        id: 'q3',
        question: 'What is the maximum number of Bitcoins that can ever exist?',
        options: [
          '10 million',
          '21 million',
          '100 million',
          'Unlimited'
        ],
        correctAnswer: 1,
        explanation: 'Bitcoin has a fixed supply of 21 million coins, making it deflationary by design.'
      }
    ],
    actionItems: [
      {
        id: 'ai1',
        title: 'Research Bitcoin Price History',
        description: 'Look up Bitcoin\'s price over the last 5 years and identify key events',
        type: 'research',
        completed: false
      },
      {
        id: 'ai2',
        title: 'Discuss with Friends',
        description: 'Explain Bitcoin to someone who doesn\'t know about it',
        type: 'discussion',
        completed: false
      }
    ]
  },
  {
    id: 'investment_strategies',
    title: 'Bitcoin Investment Strategies',
    description: 'Learn different approaches to investing in Bitcoin',
    category: 'investment',
    difficulty: 'intermediate',
    duration: 12,
    videoUrl: 'https://www.youtube.com/embed/41JCpzvnn_0',
    completionReward: 75,
    quiz: [
      {
        id: 'q1',
        question: 'What is Dollar Cost Averaging (DCA)?',
        options: [
          'Buying Bitcoin only when it\'s at its lowest price',
          'Investing a fixed amount regularly regardless of price',
          'Selling all Bitcoin when the price drops',
          'Only buying Bitcoin during bull markets'
        ],
        correctAnswer: 1,
        explanation: 'DCA involves investing a fixed amount at regular intervals, reducing the impact of volatility.'
      },
      {
        id: 'q2',
        question: 'What percentage of your portfolio should you allocate to Bitcoin?',
        options: [
          '100% - go all in',
          '5-10% for most investors',
          '0% - it\'s too risky',
          '50% or more'
        ],
        correctAnswer: 1,
        explanation: 'Most financial advisors recommend 5-10% allocation to Bitcoin for diversification.'
      }
    ],
    actionItems: [
      {
        id: 'ai1',
        title: 'Create Investment Plan',
        description: 'Write down your Bitcoin investment strategy and goals',
        type: 'practice',
        completed: false
      },
      {
        id: 'ai2',
        title: 'Set Up DCA Schedule',
        description: 'Plan your regular Bitcoin purchases',
        type: 'application',
        completed: false
      }
    ]
  },
  {
    id: 'security_best_practices',
    title: 'Bitcoin Security Best Practices',
    description: 'Learn how to keep your Bitcoin safe and secure',
    category: 'security',
    difficulty: 'intermediate',
    duration: 10,
    videoUrl: 'https://www.youtube.com/embed/8TjSXl5UuUY',
    completionReward: 60,
    quiz: [
      {
        id: 'q1',
        question: 'What is a hardware wallet?',
        options: [
          'A physical device that stores Bitcoin offline',
          'A software app on your phone',
          'A bank account for Bitcoin',
          'A type of Bitcoin mining equipment'
        ],
        correctAnswer: 0,
        explanation: 'Hardware wallets are physical devices that store private keys offline for maximum security.'
      },
      {
        id: 'q2',
        question: 'What is the most important security practice?',
        options: [
          'Sharing your private keys with trusted friends',
          'Keeping your private keys secret and secure',
          'Storing Bitcoin on exchanges only',
          'Using the same password everywhere'
        ],
        correctAnswer: 1,
        explanation: 'Private keys must be kept secret - anyone with your private keys can access your Bitcoin.'
      }
    ],
    actionItems: [
      {
        id: 'ai1',
        title: 'Security Audit',
        description: 'Review your current Bitcoin security practices',
        type: 'practice',
        completed: false
      },
      {
        id: 'ai2',
        title: 'Backup Plan',
        description: 'Create a secure backup of your Bitcoin wallet',
        type: 'application',
        completed: false
      }
    ]
  }
];

const WatchVideo: React.FC<WatchVideoProps> = ({ onComplete, onReturnToGames }) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentStep, setCurrentStep] = useState<'selection' | 'video' | 'quiz' | 'actions' | 'complete'>('selection');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const [actionItemsCompleted, setActionItemsCompleted] = useState<{[key: string]: boolean}>({});
  const [kesEarned, setKesEarned] = useState<number>(0);
  const [showPostGame, setShowPostGame] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const selectModule = (module: LearningModule) => {
    setSelectedModule(module);
    setCurrentStep('video');
    setQuizAnswers({});
    setActionItemsCompleted({});
  };

  const handleVideoComplete = () => {
    setCurrentStep('quiz');
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleQuizSubmit = () => {
    if (!selectedModule) return;
    
    let correctAnswers = 0;
    selectedModule.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / selectedModule.quiz.length) * 100);
    setQuizScore(score);
    setCurrentStep('actions');
  };

  const handleActionItemToggle = (actionId: string) => {
    setActionItemsCompleted(prev => ({ ...prev, [actionId]: !prev[actionId] }));
  };

  const handleComplete = () => {
    if (!selectedModule) return;
    
    // Calculate reward based on completion
    let totalReward = selectedModule.completionReward;
    
    // Bonus for quiz performance
    if (quizScore >= 80) {
      totalReward += 25; // Bonus for high quiz score
    }
    
    // Bonus for completing action items
    const completedActions = Object.values(actionItemsCompleted).filter(Boolean).length;
    const actionBonus = completedActions * 10;
    totalReward += actionBonus;
    
    setKesEarned(totalReward);
    onComplete(totalReward);
    setShowPostGame(true);
  };

  const handlePlayAgain = () => {
    setShowPostGame(false);
    setSelectedModule(null);
    setCurrentStep('selection');
    setQuizAnswers({});
    setActionItemsCompleted({});
    setKesEarned(0);
    setQuizScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bitcoin_basics': return '📚';
      case 'investment': return '💰';
      case 'security': return '🔒';
      case 'economics': return '📊';
      default: return '🎓';
    }
  };

  // Show post-game interface if reward was collected
  if (showPostGame) {
    return (
      <PostGameInterface
        gameName="Interactive Learning Hub"
        kesEarned={kesEarned}
        onPlayAgain={handlePlayAgain}
        onReturnToGames={onReturnToGames}
      />
    );
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Interactive Learning Hub</h3>
        <p className="text-gray-400">
          Learn Bitcoin through videos, quizzes, and actionable tasks!
        </p>
      </div>

      {/* Module Selection */}
      {currentStep === 'selection' && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-white">Choose a Learning Module:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {LEARNING_MODULES.map((module) => (
              <motion.button
                key={module.id}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left transition-colors border border-gray-600"
                onClick={() => selectModule(module)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(module.category)}</span>
                    <h5 className="font-semibold text-white">{module.title}</h5>
                  </div>
                  <span className={`text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{module.description}</p>
                <div className="text-xs text-gray-400">
                  <div>Duration: {module.duration} minutes</div>
                  <div>Reward: {module.completionReward} KES</div>
                  <div>Quiz: {module.quiz.length} questions</div>
                  <div>Actions: {module.actionItems.length} tasks</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Video Step */}
      {currentStep === 'video' && selectedModule && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h4 className="text-lg font-semibold text-white mb-4">{selectedModule.title}</h4>
            
            <div className="aspect-video bg-gray-800 rounded-lg mb-4">
              <iframe
                src={selectedModule.videoUrl}
                className="w-full h-full rounded-lg"
                title={selectedModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-blue-900/20 p-3 rounded mb-4">
              <div className="text-blue-400 font-semibold mb-1">📝 Learning Objectives:</div>
              <div className="text-sm text-gray-300">{selectedModule.description}</div>
            </div>

            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              onClick={handleVideoComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Video & Take Quiz
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Quiz Step */}
      {currentStep === 'quiz' && selectedModule && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <h4 className="text-lg font-semibold text-white mb-4">Knowledge Check</h4>
            
            {selectedModule.quiz.map((question, index) => (
              <div key={question.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h5 className="font-semibold text-white mb-3">
                  Question {index + 1}: {question.question}
                </h5>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={optionIndex}
                        checked={quizAnswers[question.id] === optionIndex}
                        onChange={() => handleQuizAnswer(question.id, optionIndex)}
                        className="text-red-500"
                      />
                      <span className="text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <motion.button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < selectedModule.quiz.length}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Quiz
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Action Items Step */}
      {currentStep === 'actions' && selectedModule && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Action Items</h4>
              <div className="text-sm text-gray-400">
                Quiz Score: {quizScore}%
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              {selectedModule.actionItems.map((action) => (
                <label key={action.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={actionItemsCompleted[action.id] || false}
                    onChange={() => handleActionItemToggle(action.id)}
                    className="mt-1 text-green-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">{action.title}</div>
                    <div className="text-sm text-gray-300">{action.description}</div>
                    <div className="text-xs text-gray-500 mt-1">Type: {action.type}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-green-900/20 p-3 rounded mb-4">
              <div className="text-green-400 font-semibold mb-1">🎯 Learning Tip:</div>
              <div className="text-sm text-gray-300">
                Complete these action items to reinforce your learning and earn bonus KES!
              </div>
            </div>

            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              onClick={handleComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Learning Module
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-500">
        <p>📚 Choose a learning module to start your educational journey</p>
        <p>🎥 Watch the video and absorb the knowledge</p>
        <p>❓ Take the quiz to test your understanding</p>
        <p>✅ Complete action items to apply your learning</p>
        <p>⏰ 5-minute cooldown after completion</p>
      </div>
    </div>
  );
};

export default WatchVideo;
