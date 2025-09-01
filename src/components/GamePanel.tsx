import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Bitcoin, 
  Target, 
  TrendingUp,
  Shield,
  Calculator,
  Play,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Clock,
  Zap,
  Brain,
  Puzzle,
  BarChart3,
  PieChart
} from 'lucide-react';

interface EducationalTool {
  id: string;
  title: string;
  description: string;
  category: 'Financial Tools' | 'Interactive Learning' | 'Assessment Tools' | 'Practical Applications';
  icon: React.ReactNode;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  status: 'available' | 'coming-soon' | 'beta';
  features: string[];
}

const GamePanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const educationalTools: EducationalTool[] = [
    {
      id: 'bitcoin-price-tracker',
      title: 'Bitcoin Price Tracker & Analysis',
      description: 'Real-time Bitcoin price monitoring with historical data, market analysis, and educational insights for understanding cryptocurrency markets.',
      category: 'Financial Tools',
      icon: <Bitcoin className="w-8 h-8" />,
      color: 'bg-orange-500',
      difficulty: 'Beginner',
      duration: '15-20 min',
      status: 'available',
      features: ['Real-time price data', 'Historical charts', 'Market analysis', 'Educational content']
    },
    {
      id: 'sacco-calculator',
      title: 'SACCO Financial Calculator',
      description: 'Comprehensive calculator for SACCO operations including loan calculations, interest rates, savings projections, and dividend estimates.',
      category: 'Financial Tools',
      icon: <Calculator className="w-8 h-8" />,
      color: 'bg-blue-500',
      difficulty: 'Beginner',
      duration: '10-15 min',
      status: 'available',
      features: ['Loan calculator', 'Savings projections', 'Interest calculations', 'Dividend estimates']
    },
    {
      id: 'chama-manager',
      title: 'Chama Management Simulator',
      description: 'Interactive simulation for managing chama operations including member management, project planning, and financial tracking.',
      category: 'Interactive Learning',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-500',
      difficulty: 'Intermediate',
      duration: '20-30 min',
      status: 'available',
      features: ['Member management', 'Project planning', 'Financial tracking', 'Decision scenarios']
    },
    {
      id: 'investment-simulator',
      title: 'Investment Risk Simulator',
      description: 'Learn investment principles through interactive simulations covering different asset classes, risk levels, and market scenarios.',
      category: 'Interactive Learning',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-emerald-500',
      difficulty: 'Intermediate',
      duration: '25-35 min',
      status: 'available',
      features: ['Asset allocation', 'Risk assessment', 'Market scenarios', 'Portfolio building']
    },
    {
      id: 'financial-literacy-quiz',
      title: 'Financial Literacy Assessment',
      description: 'Comprehensive assessment tool to test your knowledge of financial concepts, SACCO operations, and investment principles.',
      category: 'Assessment Tools',
      icon: <Brain className="w-8 h-8" />,
      color: 'bg-purple-500',
      difficulty: 'Beginner',
      duration: '15-20 min',
      status: 'available',
      features: ['Knowledge assessment', 'Progress tracking', 'Detailed feedback', 'Learning recommendations']
    },
    {
      id: 'budget-planner',
      title: 'Interactive Budget Planner',
      description: 'Dynamic budget planning tool with real-time calculations, goal setting, and progress tracking for personal financial management.',
      category: 'Practical Applications',
      icon: <PieChart className="w-8 h-8" />,
      color: 'bg-indigo-500',
      difficulty: 'Beginner',
      duration: '20-25 min',
      status: 'available',
      features: ['Budget creation', 'Goal setting', 'Progress tracking', 'Expense analysis']
    },
    {
      id: 'emergency-fund-calculator',
      title: 'Emergency Fund Calculator',
      description: 'Calculate your emergency fund needs based on monthly expenses, risk factors, and financial goals with personalized recommendations.',
      category: 'Financial Tools',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-red-500',
      difficulty: 'Beginner',
      duration: '10-15 min',
      status: 'available',
      features: ['Expense analysis', 'Risk assessment', 'Fund recommendations', 'Savings timeline']
    },
    {
      id: 'retirement-planner',
      title: 'Retirement Planning Simulator',
      description: 'Advanced retirement planning tool with multiple scenarios, investment strategies, and long-term financial projections.',
      category: 'Practical Applications',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-yellow-500',
      difficulty: 'Advanced',
      duration: '30-40 min',
      status: 'coming-soon',
      features: ['Multiple scenarios', 'Investment strategies', 'Long-term projections', 'Tax considerations']
    },
    {
      id: 'crypto-portfolio-tracker',
      title: 'Cryptocurrency Portfolio Tracker',
      description: 'Track and analyze your cryptocurrency investments with real-time data, performance metrics, and educational insights.',
      category: 'Financial Tools',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-cyan-500',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      status: 'beta',
      features: ['Portfolio tracking', 'Performance metrics', 'Real-time data', 'Risk analysis']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Puzzle className="w-5 h-5" />, count: educationalTools.length },
    { id: 'Financial Tools', name: 'Financial Tools', icon: <Calculator className="w-5 h-5" />, count: educationalTools.filter(t => t.category === 'Financial Tools').length },
    { id: 'Interactive Learning', name: 'Interactive Learning', icon: <Play className="w-5 h-5" />, count: educationalTools.filter(t => t.category === 'Interactive Learning').length },
    { id: 'Assessment Tools', name: 'Assessment Tools', icon: <Brain className="w-5 h-5" />, count: educationalTools.filter(t => t.category === 'Assessment Tools').length },
    { id: 'Practical Applications', name: 'Practical Applications', icon: <Target className="w-5 h-5" />, count: educationalTools.filter(t => t.category === 'Practical Applications').length }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? educationalTools
    : educationalTools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleBackToTools = () => {
    setSelectedTool(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">Available</span>;
      case 'coming-soon':
        return <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-xs">Coming Soon</span>;
      case 'beta':
        return <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">Beta</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {!selectedTool ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Interactive Learning Tools
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                Apply your knowledge through hands-on tools, simulations, and practical applications. 
                Learn by doing with our comprehensive suite of educational resources.
              </p>
              
              {/* Knowledge Nugget */}
              <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Lightbulb className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-semibold text-white">💡 Learning Through Practice</h3>
                </div>
                <p className="text-white text-lg">
                  "The best way to learn is by doing. Our interactive tools help you apply theoretical knowledge 
                  to real-world scenarios, building practical skills and confidence."
                </p>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-102'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                    <span className="bg-gray-600 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all cursor-pointer group"
                  onClick={() => handleToolClick(tool.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${tool.color} p-3 rounded-lg`}>
                      {tool.icon}
                    </div>
                    {getStatusBadge(tool.status)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{tool.duration}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tool.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                      tool.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {tool.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-gray-400">Features:</span>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          +{tool.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-400">
                      {tool.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Practice What You've Learned?
                </h2>
                <p className="text-white text-lg mb-6">
                  Choose from our comprehensive suite of interactive tools and start applying your knowledge. 
                  Track your progress and earn certificates as you master each tool.
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 mx-auto">
                  <Play className="w-5 h-5" />
                  <span>Explore All Tools</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          /* Tool Detail View */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Tool Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToTools}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Tools</span>
              </button>
            </div>

            {/* Tool Content */}
            {(() => {
              const tool = educationalTools.find(t => t.id === selectedTool);
              if (!tool) return null;

              return (
                <div className="space-y-6">
                  {/* Tool Overview */}
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <div className="flex items-start space-x-6">
                      <div className={`${tool.color} p-4 rounded-xl`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h1 className="text-3xl font-bold text-white">{tool.title}</h1>
                          {getStatusBadge(tool.status)}
                        </div>
                        <p className="text-gray-300 text-lg mb-4">{tool.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <span className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{tool.duration}</span>
                          </span>
                          <span className={`px-3 py-1 rounded-full ${
                            tool.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                            tool.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                            {tool.difficulty}
                          </span>
                          <span className="flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>{tool.category}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tool Actions */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Ready to Get Started?</h3>
                        <p className="text-gray-400">
                          {tool.status === 'available' 
                            ? 'Launch the tool and start learning through practice'
                            : tool.status === 'coming-soon'
                            ? 'This tool will be available soon. Stay tuned for updates!'
                            : 'This tool is in beta. Try it out and provide feedback!'
                          }
                        </p>
                      </div>
                      {tool.status === 'available' && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                          <Play className="w-5 h-5" />
                          <span>Launch Tool</span>
                        </button>
                      )}
                      {tool.status === 'coming-soon' && (
                        <button className="bg-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>Coming Soon</span>
                        </button>
                      )}
                      {tool.status === 'beta' && (
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                          <Zap className="w-5 h-5" />
                          <span>Try Beta</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamePanel;
