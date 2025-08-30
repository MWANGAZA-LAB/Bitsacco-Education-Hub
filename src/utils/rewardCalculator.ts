import { GameType } from '../types';

export interface RewardRange {
  min: number;
  max: number;
  base: number;
}

export const GAME_REWARDS: Record<GameType, RewardRange> = {
  rollDice: { min: 50, max: 200, base: 100 },
  drawEnvelope: { min: 100, max: 300, base: 150 },
  watchVideo: { min: 75, max: 150, base: 100 },
  satJoke: { min: 25, max: 100, base: 50 },
  mondayMood: { min: 50, max: 150, base: 75 },
  emojiChallenge: { min: 75, max: 200, base: 125 },
  groupCount: { min: 100, max: 250, base: 150 },
  hodlLetters: { min: 50, max: 175, base: 100 },
  snakeSats: { min: 0, max: 0, base: 0 },
  privacyJenga: { min: 0, max: 0, base: 0 }
};

export const calculateReward = (gameType: GameType): number => {
  const reward = GAME_REWARDS[gameType];
  
  if (reward.min === 0 && reward.max === 0) {
    return 0; // Educational games don't give rewards
  }
  
  return Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
};

export const getRewardRange = (gameType: GameType): string => {
  const reward = GAME_REWARDS[gameType];
  return `${reward.min} - ${reward.max} KES`;
};
