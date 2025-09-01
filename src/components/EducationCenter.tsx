import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  PiggyBank, 
  Bitcoin, 
  TrendingUp,
  Shield,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Lightbulb,
  Clock,
  Award,
  Target,
  Globe,
  Zap,
  FileText,
  Video,
  Download
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'SACCO' | 'Chama' | 'Savings' | 'Bitcoin' | 'Investment' | 'Financial Planning' | 'Risk Management';
  icon: React.ReactNode;
  color: string;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
  featured?: boolean;
  certificate?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'case-study' | 'workshop';
  duration: number; // minutes
  completed: boolean;
  resources?: string[];
}

const EducationCenter: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const learningModules: LearningModule[] = [
    {
      id: 'sacco-foundations',
      title: 'SACCO Foundations & Governance',
      description: 'Master the fundamentals of SACCO operations, governance structures, and regulatory frameworks in Kenya and globally',
      duration: '4-5 hours',
      difficulty: 'Beginner',
      category: 'SACCO',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-blue-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'sacco-history',
          title: 'History & Evolution of SACCOs in Kenya',
          content: 'Explore the rich history of SACCOs from the 1960s to present day. Learn about key milestones, regulatory changes, and success stories that shaped the cooperative movement in Kenya.',
          type: 'video',
          duration: 25,
          completed: false,
          resources: ['Historical Timeline', 'Success Stories', 'Regulatory Framework']
        },
        {
          id: 'sacco-global',
          title: 'Global SACCO Systems & Best Practices',
          content: 'Discover how SACCOs operate worldwide: Credit Unions (USA), ROSCAs (Nigeria), Village Banks (Latin America), and European cooperative models. Learn from global best practices.',
          type: 'text',
          duration: 30,
          completed: false,
          resources: ['Global Case Studies', 'Comparative Analysis', 'Best Practices Guide']
        },
        {
          id: 'sacco-structure',
          title: 'SACCO Structure & Governance',
          content: 'Understand SACCO organizational structure, board composition, member rights, and democratic governance principles. Learn about AGMs, elections, and member participation.',
          type: 'interactive',
          duration: 35,
          completed: false,
          resources: ['Governance Templates', 'Election Procedures', 'Member Rights Guide']
        },
        {
          id: 'sacco-benefits',
          title: 'Benefits & Advantages of SACCO Membership',
          content: 'Comprehensive analysis of SACCO benefits: lower interest rates, community support, financial education, sustainable growth, and social impact.',
          type: 'case-study',
          duration: 40,
          completed: false,
          resources: ['Benefits Calculator', 'ROI Analysis', 'Social Impact Metrics']
        }
      ]
    },
    {
      id: 'chama-dynamics',
      title: 'Chama Management & Dynamics',
      description: 'Learn advanced chama management techniques, conflict resolution, project planning, and sustainable growth strategies',
      duration: '5-6 hours',
      difficulty: 'Intermediate',
      category: 'Chama',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'chama-leadership',
          title: 'Chama Leadership & Management',
          content: 'Develop leadership skills for chama management: communication, decision-making, conflict resolution, and member engagement strategies.',
          type: 'workshop',
          duration: 45,
          completed: false,
          resources: ['Leadership Assessment', 'Communication Templates', 'Conflict Resolution Guide']
        },
        {
          id: 'chama-projects',
          title: 'Project Planning & Investment',
          content: 'Learn systematic project planning: feasibility studies, risk assessment, investment analysis, and project monitoring for chama investments.',
          type: 'interactive',
          duration: 50,
          completed: false,
          resources: ['Project Templates', 'Investment Calculator', 'Risk Assessment Tools']
        },
        {
          id: 'chama-sustainability',
          title: 'Sustainable Growth & Risk Management',
          content: 'Build sustainable chama growth: diversification strategies, emergency funds, succession planning, and long-term viability.',
          type: 'case-study',
          duration: 40,
          completed: false,
          resources: ['Growth Strategies', 'Risk Management Framework', 'Sustainability Checklist']
        }
      ]
    },
    {
      id: 'personal-finance-mastery',
      title: 'Personal Finance Mastery',
      description: 'Comprehensive personal finance education: budgeting, saving strategies, debt management, and financial goal setting',
      duration: '6-7 hours',
      difficulty: 'Beginner',
      category: 'Savings',
      icon: <PiggyBank className="w-8 h-8" />,
      color: 'bg-purple-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'budgeting-basics',
          title: 'Budgeting Fundamentals & Tools',
          content: 'Master budgeting techniques: 50/30/20 rule, zero-based budgeting, envelope system, and digital budgeting tools for modern financial management.',
          type: 'interactive',
          duration: 35,
          completed: false,
          resources: ['Budget Templates', 'Expense Trackers', 'Budgeting Apps Guide']
        },
        {
          id: 'saving-strategies',
          title: 'Advanced Saving Strategies',
          content: 'Learn proven saving strategies: automated savings, goal-based saving, emergency fund building, and saving psychology for long-term success.',
          type: 'workshop',
          duration: 40,
          completed: false,
          resources: ['Saving Calculator', 'Goal Setting Framework', 'Motivation Techniques']
        },
        {
          id: 'debt-management',
          title: 'Debt Management & Elimination',
          content: 'Master debt management: debt snowball vs. avalanche methods, interest rate optimization, debt consolidation, and building credit responsibly.',
          type: 'case-study',
          duration: 45,
          completed: false,
          resources: ['Debt Calculator', 'Repayment Plans', 'Credit Building Guide']
        }
      ]
    },
    {
      id: 'bitcoin-literacy',
      title: 'Bitcoin & Digital Asset Literacy',
      description: 'Comprehensive Bitcoin education: fundamentals, security, global adoption, and responsible participation in the digital economy',
      duration: '7-8 hours',
      difficulty: 'Intermediate',
      category: 'Bitcoin',
      icon: <Bitcoin className="w-8 h-8" />,
      color: 'bg-orange-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'bitcoin-fundamentals',
          title: 'Bitcoin Fundamentals & Technology',
          content: 'Deep dive into Bitcoin technology: blockchain, cryptography, mining, wallets, and the decentralized nature of digital currency.',
          type: 'video',
          duration: 50,
          completed: false,
          resources: ['Technology Guide', 'Interactive Blockchain Demo', 'Wallet Security Checklist']
        },
        {
          id: 'bitcoin-security',
          title: 'Security & Risk Management',
          content: 'Master Bitcoin security: private key management, hardware wallets, multi-signature setups, and protecting against common threats.',
          type: 'workshop',
          duration: 55,
          completed: false,
          resources: ['Security Checklist', 'Hardware Wallet Guide', 'Risk Assessment Tools']
        },
        {
          id: 'bitcoin-global',
          title: 'Global Bitcoin Adoption & Use Cases',
          content: 'Explore Bitcoin adoption worldwide: remittances, financial inclusion, store of value, and emerging use cases in developing economies.',
          type: 'case-study',
          duration: 45,
          completed: false,
          resources: ['Global Adoption Map', 'Use Case Studies', 'Economic Impact Analysis']
        }
      ]
    },
    {
      id: 'investment-principles',
      title: 'Investment Principles & Risk Management',
      description: 'Learn fundamental investment principles, risk assessment, portfolio diversification, and responsible investment strategies',
      duration: '5-6 hours',
      difficulty: 'Intermediate',
      category: 'Investment',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-emerald-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'investment-basics',
          title: 'Investment Fundamentals & Asset Classes',
          content: 'Understand investment basics: stocks, bonds, real estate, commodities, and alternative investments. Learn about risk-return relationships.',
          type: 'interactive',
          duration: 40,
          completed: false,
          resources: ['Asset Class Guide', 'Risk Assessment Tools', 'Investment Glossary']
        },
        {
          id: 'portfolio-diversification',
          title: 'Portfolio Diversification & Asset Allocation',
          content: 'Master portfolio diversification: correlation analysis, asset allocation strategies, rebalancing, and building resilient investment portfolios.',
          type: 'workshop',
          duration: 45,
          completed: false,
          resources: ['Portfolio Builder', 'Diversification Calculator', 'Rebalancing Guide']
        },
        {
          id: 'risk-management',
          title: 'Risk Management & Investment Psychology',
          content: 'Learn risk management techniques: stop-loss strategies, position sizing, emotional control, and long-term investment mindset.',
          type: 'case-study',
          duration: 50,
          completed: false,
          resources: ['Risk Assessment Tools', 'Psychology Guide', 'Behavioral Finance Tips']
        }
      ]
    },
    {
      id: 'financial-planning',
      title: 'Comprehensive Financial Planning',
      description: 'Master financial planning: goal setting, retirement planning, insurance, tax optimization, and legacy planning',
      duration: '6-7 hours',
      difficulty: 'Advanced',
      category: 'Financial Planning',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-indigo-500',
      progress: 0,
      completed: false,
      featured: true,
      certificate: true,
      lessons: [
        {
          id: 'goal-setting',
          title: 'Financial Goal Setting & Planning',
          content: 'Learn systematic financial goal setting: SMART goals, timeline planning, milestone tracking, and adjusting plans as life changes.',
          type: 'workshop',
          duration: 45,
          completed: false,
          resources: ['Goal Setting Framework', 'Planning Templates', 'Progress Trackers']
        },
        {
          id: 'retirement-planning',
          title: 'Retirement Planning & Pension Systems',
          content: 'Master retirement planning: pension calculations, social security, retirement accounts, and building sustainable retirement income.',
          type: 'interactive',
          duration: 50,
          completed: false,
          resources: ['Retirement Calculator', 'Pension Guide', 'Income Planning Tools']
        },
        {
          id: 'legacy-planning',
          title: 'Estate & Legacy Planning',
          content: 'Understand estate planning: wills, trusts, beneficiary designations, tax implications, and creating lasting financial legacies.',
          type: 'case-study',
          duration: 55,
          completed: false,
          resources: ['Estate Planning Checklist', 'Legal Guide', 'Legacy Planning Tools']
        }
      ]
    },
    {
      id: 'risk-management',
      title: 'Advanced Risk Management',
      description: 'Master risk management strategies: insurance planning, emergency preparedness, business continuity, and financial resilience',
      duration: '4-5 hours',
      difficulty: 'Advanced',
      category: 'Risk Management',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-red-500',
      progress: 0,
      completed: false,
      featured: false,
      certificate: true,
      lessons: [
        {
          id: 'insurance-planning',
          title: 'Insurance Planning & Risk Transfer',
          content: 'Learn insurance fundamentals: life, health, property, liability insurance, and building comprehensive protection strategies.',
          type: 'workshop',
          duration: 40,
          completed: false,
          resources: ['Insurance Assessment', 'Coverage Calculator', 'Policy Comparison Tools']
        },
        {
          id: 'emergency-preparedness',
          title: 'Emergency Preparedness & Business Continuity',
          content: 'Build emergency preparedness: emergency funds, business continuity planning, disaster recovery, and maintaining financial stability.',
          type: 'case-study',
          duration: 45,
          completed: false,
          resources: ['Emergency Planning Guide', 'Business Continuity Templates', 'Recovery Checklists']
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen className="w-5 h-5" />, count: learningModules.length },
    { id: 'SACCO', name: 'SACCO', icon: <Shield className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'SACCO').length },
    { id: 'Chama', name: 'Chama', icon: <Users className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Chama').length },
    { id: 'Savings', name: 'Personal Finance', icon: <PiggyBank className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Savings').length },
    { id: 'Bitcoin', name: 'Bitcoin', icon: <Bitcoin className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Bitcoin').length },
    { id: 'Investment', name: 'Investment', icon: <TrendingUp className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Investment').length },
    { id: 'Financial Planning', name: 'Financial Planning', icon: <Target className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Financial Planning').length },
    { id: 'Risk Management', name: 'Risk Management', icon: <Shield className="w-5 h-5" />, count: learningModules.filter(m => m.category === 'Risk Management').length }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? learningModules.filter(module => 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : learningModules.filter(module => 
        module.category === selectedCategory && (
          module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleBackToModules = () => {
    setActiveModule(null);
  };

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
            Bitsacco Learning Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Your gateway to comprehensive financial literacy, SACCO expertise, and Bitcoin education. 
            Learn from industry experts and build wealth with your community.
          </p>
          
          {/* Knowledge Nugget */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Lightbulb className="w-6 h-6 text-yellow-300" />
              <h3 className="text-xl font-semibold text-white">💡 Learning Philosophy</h3>
            </div>
            <p className="text-white text-lg">
              "Education is the foundation of financial success. We believe in learning by doing, 
              community-driven knowledge sharing, and practical application of financial principles."
            </p>
          </div>
        </motion.div>

        {!activeModule ? (
          <>
            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 space-y-6"
            >
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses, topics, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Category Filter */}
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

            {/* Featured Courses */}
            {selectedCategory === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Featured Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningModules.filter(m => m.featured).slice(0, 3).map((module) => (
                    <motion.div
                      key={module.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all cursor-pointer group"
                      onClick={() => handleModuleClick(module.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${module.color} p-3 rounded-lg`}>
                          {module.icon}
                        </div>
                        {module.certificate && (
                          <Award className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {module.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          module.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                          module.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-red-600/20 text-red-400'
                        }`}>
                          {module.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {module.lessons.length} lessons
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Learning Modules Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all cursor-pointer group"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${module.color} p-3 rounded-lg`}>
                      {module.icon}
                    </div>
                    {module.certificate && (
                      <Award className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      module.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {module.lessons.length} lessons
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
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Financial Future?
                </h2>
                <p className="text-white text-lg mb-6">
                  Join thousands of Kenyans building wealth through education, community, and smart financial decisions. 
                  Start your learning journey today and earn your financial literacy certificate.
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 mx-auto">
                  <Star className="w-5 h-5" />
                  <span>Start Your Learning Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          /* Module Detail View */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Module Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToModules}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Courses</span>
              </button>
            </div>

            {/* Module Content */}
            {(() => {
              const module = learningModules.find(m => m.id === activeModule);
              if (!module) return null;

              return (
                <div className="space-y-6">
                  {/* Module Overview */}
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <div className="flex items-start space-x-6">
                      <div className={`${module.color} p-4 rounded-xl`}>
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-3">{module.title}</h1>
                        <p className="text-gray-300 text-lg mb-4">{module.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <span className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </span>
                          <span className={`px-3 py-1 rounded-full ${
                            module.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                            module.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                            {module.difficulty}
                          </span>
                          <span className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>{module.lessons.length} lessons</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Course Content</h2>
                    {module.lessons.map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">{lesson.title}</h3>
                              <p className="text-gray-400 text-sm">{lesson.content}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-400" />}
                              {lesson.type === 'text' && <FileText className="w-4 h-4 text-green-400" />}
                              {lesson.type === 'quiz' && <Target className="w-4 h-4 text-purple-400" />}
                              {lesson.type === 'interactive' && <Zap className="w-4 h-4 text-yellow-400" />}
                              {lesson.type === 'case-study' && <Globe className="w-4 h-4 text-indigo-400" />}
                              {lesson.type === 'workshop' && <Users className="w-4 h-4 text-pink-400" />}
                            </div>
                            
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Play className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                        </div>
                        
                        {lesson.resources && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-400">Resources:</span>
                              {lesson.resources.map((resource, idx) => (
                                <button
                                  key={idx}
                                  className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>{resource}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Module Actions */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Ready to Start Learning?</h3>
                        <p className="text-gray-400">Begin with the first lesson and track your progress</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                        <Play className="w-5 h-5" />
                        <span>Start Learning</span>
                      </button>
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

export default EducationCenter;
