export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetKES: number;
  icon: string;
  achieved: boolean;
  achievedAt?: number;
}

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 'first-100',
    title: 'First 100 KES',
    description: 'Earn your first 100 KES',
    targetKES: 100,
    icon: '💰',
    achieved: false
  },
  {
    id: 'first-500',
    title: '500 KES Milestone',
    description: 'Reach 500 KES in savings',
    targetKES: 500,
    icon: '🎯',
    achieved: false
  },
  {
    id: 'first-1000',
    title: '1,000 KES Goal',
    description: 'Achieve your first 1,000 KES',
    targetKES: 1000,
    icon: '🏆',
    achieved: false
  },
  {
    id: 'first-2000',
    title: '2,000 KES Achievement',
    description: 'Reach 2,000 KES milestone',
    targetKES: 2000,
    icon: '💎',
    achieved: false
  },
  {
    id: 'first-5000',
    title: '5,000 KES Master',
    description: 'Become a 5,000 KES master',
    targetKES: 5000,
    icon: '👑',
    achieved: false
  }
];

export const checkMilestones = (totalKESEarned: number, currentMilestones: Milestone[]): Milestone[] => {
  return currentMilestones.map(milestone => {
    if (!milestone.achieved && totalKESEarned >= milestone.targetKES) {
      return {
        ...milestone,
        achieved: true,
        achievedAt: Date.now()
      };
    }
    return milestone;
  });
};

export const getNextMilestone = (totalKESEarned: number, milestones: Milestone[]): Milestone | null => {
  const unachieved = milestones.filter(m => !m.achieved);
  const next = unachieved.find(m => m.targetKES > totalKESEarned);
  return next || null;
};
