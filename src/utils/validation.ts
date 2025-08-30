// Simple validation utilities (in production, use Zod or Yup)
export const validation = {
  // Validate savings goal
  savingsGoal: (targetKES: number, month: string) => {
    const validMonths = ['september', 'october', 'november', 'december'];
    const monthLimits = {
      september: { min: 500, max: 2000 },
      october: { min: 1000, max: 3000 },
      november: { min: 1500, max: 4000 },
      december: { min: 2000, max: 5000 }
    };

    if (!validMonths.includes(month)) {
      throw new Error('Invalid month selected');
    }

    const limits = monthLimits[month as keyof typeof monthLimits];
    if (targetKES < limits.min || targetKES > limits.max) {
      throw new Error(`Target must be between ${limits.min.toLocaleString()} and ${limits.max.toLocaleString()} KES for ${month}`);
    }

    return true;
  },

  // Validate game type
  gameType: (gameType: string) => {
    const validGames = [
      'rollDice', 'drawEnvelope', 'watchVideo', 'satJoke', 
      'mondayMood', 'emojiChallenge', 'groupCount', 'hodlLetters',
      'snakeSats', 'privacyJenga'
    ];

    if (!validGames.includes(gameType)) {
      throw new Error('Invalid game type');
    }

    return true;
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, 100); // Limit length
  },

  // Validate KES amount
  kesAmount: (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Invalid KES amount');
    }

    if (amount < 0 || amount > 10000) {
      throw new Error('KES amount must be between 0 and 10,000');
    }

    return true;
  }
};
