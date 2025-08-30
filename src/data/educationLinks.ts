export interface EducationItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'resource' | 'game';
  url: string;
  icon: string;
  duration?: string;
}

export interface EducationCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: EducationItem[];
}

export const EDUCATION_CATEGORIES: EducationCategory[] = [
  {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics',
    description: 'Learn the fundamentals of Bitcoin',
    icon: '₿',
    items: [
      {
        id: 'what-is-bitcoin',
        title: 'What is Bitcoin?',
        description: 'Introduction to Bitcoin and cryptocurrency',
        type: 'video',
        url: 'https://bitcoin.org/en/getting-started',
        icon: '🎥',
        duration: '5 min'
      },
      {
        id: 'how-bitcoin-works',
        title: 'How Bitcoin Works',
        description: 'Understanding blockchain and mining',
        type: 'article',
        url: 'https://bitcoin.org/en/how-it-works',
        icon: '📖'
      },
      {
        id: 'bitcoin-vs-traditional',
        title: 'Bitcoin vs Traditional Money',
        description: 'Comparing Bitcoin to fiat currency',
        type: 'article',
        url: 'https://bitcoin.org/en/faq',
        icon: '💱'
      }
    ]
  },
  {
    id: 'savings-strategies',
    title: 'Savings Strategies',
    description: 'Smart ways to save and invest',
    icon: '💰',
    items: [
      {
        id: 'dollar-cost-averaging',
        title: 'Dollar Cost Averaging',
        description: 'Systematic investment strategy',
        type: 'article',
        url: 'https://bitcoin.org/en/faq',
        icon: '📈'
      },
      {
        id: 'emergency-fund',
        title: 'Emergency Fund in Bitcoin',
        description: 'Building financial security',
        type: 'article',
        url: 'https://bitcoin.org/en/getting-started',
        icon: '🛡️'
      },
      {
        id: 'long-term-planning',
        title: 'Long-term Planning',
        description: 'Strategic Bitcoin investment',
        type: 'video',
        url: 'https://bitcoin.org/en/how-it-works',
        icon: '🎯',
        duration: '8 min'
      }
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    description: 'Protecting your Bitcoin',
    icon: '🔐',
    items: [
      {
        id: 'wallet-security',
        title: 'Wallet Security',
        description: 'Keeping your Bitcoin safe',
        type: 'article',
        url: 'https://bitcoin.org/en/secure-your-wallet',
        icon: '🔒'
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
        id: 'avoiding-scams',
        title: 'Avoiding Scams',
        description: 'Common Bitcoin scams and how to avoid them',
        type: 'video',
        url: 'https://bitcoin.org/en/faq',
        icon: '🚫',
        duration: '6 min'
      }
    ]
  }
];

export const getAllCategories = (): EducationCategory[] => {
  return EDUCATION_CATEGORIES;
};

export const getCategoryById = (id: string): EducationCategory | undefined => {
  return EDUCATION_CATEGORIES.find(category => category.id === id);
};

export const getItemById = (itemId: string): EducationItem | undefined => {
  for (const category of EDUCATION_CATEGORIES) {
    const item = category.items.find(item => item.id === itemId);
    if (item) return item;
  }
  return undefined;
};
