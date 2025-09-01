import { useState, useMemo, useEffect } from 'react';
import { FinancialGoal, FinancialMetric, DashboardTab, DashboardTool } from '../types/dashboard';
import { userDataManager } from '../utils/userDataManager';
import { 
  TrendingUp, 
  Target, 
  PiggyBank, 
  Calculator,
  BarChart3,
  Bitcoin,
  Users,
  Shield
} from 'lucide-react';

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'tools' | 'progress' | 'certificates'>('overview');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [userData, setUserData] = useState(userDataManager.initializeUserData());

  // Load user data on mount
  useEffect(() => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    setUserData(data);
  }, []);

  // Real financial goals from user data
  const financialGoals = useMemo<FinancialGoal[]>(() => {
    return userData.goals;
  }, [userData.goals]);

  // Real financial metrics from user data
  const financialMetrics = useMemo<FinancialMetric[]>(() => [
    {
      label: 'Net Worth',
      value: userData.metrics.netWorth,
      change: 0, // This would be calculated from historical data
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400'
    },
    {
      label: 'Monthly Savings',
      value: userData.metrics.monthlySavings,
      change: 0, // This would be calculated from historical data
      changeType: 'positive' as const,
      icon: <PiggyBank className="w-5 h-5" />,
      color: 'text-green-400'
    },
    {
      label: 'Savings Rate',
      value: userData.metrics.savingsRate,
      change: 0, // This would be calculated from historical data
      changeType: 'positive' as const,
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'text-green-400'
    }
  ], [userData.metrics]);

  const dashboardTabs = useMemo<DashboardTab[]>(() => [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'goals',
      label: 'Financial Goals',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'tools',
      label: 'Learning Tools',
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: 'progress',
      label: 'Learning Progress',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: <Target className="w-5 h-5" />
    }
  ], []);

  const dashboardTools = useMemo<DashboardTool[]>(() => [
    {
      id: 'compound-interest',
      name: 'Compound Interest Calculator',
      description: 'Calculate how your savings grow over time with compound interest.',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'goal-planning',
      name: 'Goal Planning Tool',
      description: 'Plan and track your financial goals with detailed timelines.',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'budget-tracker',
      name: 'Budget Tracker',
      description: 'Track your income and expenses to maintain a healthy budget.',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'bitcoin-price-chart',
      name: 'Bitcoin Price Chart',
      description: 'Real-time Bitcoin price tracking with savings projections and historical analysis.',
      icon: <Bitcoin className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'chama-management',
      name: 'Chama Management Tool',
      description: 'Manage your chama operations, track projects, and build collective wealth.',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'sacco-education',
      name: 'SACCO Education Module',
      description: 'Learn about SACCO foundations, governance, and best practices.',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-blue-500'
    }
  ], []);

  const refreshUserData = () => {
    const data = userDataManager.loadUserData() || userDataManager.initializeUserData();
    setUserData(data);
  };

  return {
    activeTab,
    setActiveTab,
    activeTool,
    setActiveTool,
    dashboardTabs,
    dashboardTools,
    financialGoals,
    financialMetrics,
    userData,
    refreshUserData
  };
};
