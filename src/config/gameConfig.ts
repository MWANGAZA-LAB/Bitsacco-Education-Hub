// Centralized game configuration
export const GAME_CONFIG = {
  rewards: {
    rollDice: { min: 5, max: 30, cooldown: 300000 },
    drawEnvelope: { min: 10, max: 100, cooldown: 300000 },
    watchVideo: { min: 25, max: 250, cooldown: 300000 },
    satJoke: { min: 50, max: 50, cooldown: 300000 },
    mondayMood: { min: 25, max: 75, cooldown: 300000 },
    emojiChallenge: { min: 40, max: 40, cooldown: 300000 },
    groupCount: { min: 5, max: 500, cooldown: 300000 },
    hodlLetters: { min: 20, max: 20, cooldown: 300000 }
  },
  cooldownDuration: 5 * 60 * 1000, // 5 minutes
  maxPlaysPerGame: 5,
  educationalGames: ['snakeSats', 'privacyJenga'] as const
} as const;

export const MONTH_CHALLENGES = {
  september: { min: 500, max: 2000, theme: 'Foundation building' },
  october: { min: 1000, max: 3000, theme: 'Step it up' },
  november: { min: 1500, max: 4000, theme: 'No excuses' },
  december: { min: 2000, max: 5000, theme: 'Festive goal' }
} as const;

export const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: 'easeOut',
  stagger: 0.1
} as const;
