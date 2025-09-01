/**
 * Essential formatting utilities for the dashboard components
 */

export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency
  }).format(amount);
};

export const calculateProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const getDaysRemaining = (deadline: Date): number => {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'from-green-500 to-emerald-500';
  if (progress >= 60) return 'from-blue-500 to-cyan-500';
  if (progress >= 40) return 'from-yellow-500 to-orange-500';
  return 'from-red-500 to-pink-500';
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'text-red-400';
    case 'medium':
      return 'text-yellow-400';
    case 'low':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};
