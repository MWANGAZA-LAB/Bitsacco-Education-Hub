export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'emergency_fund' | 'investment' | 'debt_payoff' | 'retirement' | 'vacation' | 'education';
  priority: 'low' | 'medium' | 'high';
  monthlyContribution: number;
}

export interface FinancialMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export interface DashboardTab {
  id: 'overview' | 'goals' | 'tools' | 'progress' | 'certificates';
  label: string;
  icon: React.ReactNode;
}

export interface DashboardTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}
