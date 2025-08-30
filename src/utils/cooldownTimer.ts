import { GameType, CooldownConfig } from '@/types';

/**
 * Default cooldown configuration (30 minutes)
 */
export const DEFAULT_COOLDOWN: CooldownConfig = {
  duration: 30,
  unit: 'minutes'
};

/**
 * Convert time units to milliseconds
 */
export function timeUnitToMs(duration: number, unit: string): number {
  const multipliers = {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000
  };
  
  return duration * (multipliers[unit as keyof typeof multipliers] || multipliers.minutes);
}

export const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const calculateCooldownEnd = (): number => {
  return Date.now() + COOLDOWN_DURATION;
};

export const isCooldownActive = (cooldownUntil: number | null): boolean => {
  if (!cooldownUntil) return false;
  return cooldownUntil > Date.now();
};

export const getCooldownRemaining = (cooldownUntil: number | null): number => {
  if (!cooldownUntil || !isCooldownActive(cooldownUntil)) return 0;
  return Math.ceil((cooldownUntil - Date.now()) / 1000 / 60); // minutes remaining
};

export const formatCooldownTime = (minutes: number): string => {
  if (minutes <= 0) return 'Ready';
  return `${minutes} min remaining`;
};

/**
 * Get cooldown status for a game
 */
export function getCooldownStatus(
  gameType: GameType,
  cooldowns: Record<GameType, number>
): {
  isActive: boolean;
  remainingMs: number;
  formattedTime: string;
  progress: number;
} {
  const cooldownEnd = cooldowns[gameType];
  
  if (!cooldownEnd) {
    return {
      isActive: false,
      remainingMs: 0,
      formattedTime: 'Ready!',
      progress: 100
    };
  }

  const isActive = isCooldownActive(cooldownEnd);
  const remainingMs = getRemainingCooldown(cooldownEnd);
  const formattedTime = formatRemainingTime(remainingMs);
  
  // Calculate progress (0-100) for progress bar
  const totalCooldownMs = timeUnitToMs(DEFAULT_COOLDOWN.duration, DEFAULT_COOLDOWN.unit);
  const elapsedMs = totalCooldownMs - remainingMs;
  const progress = Math.min(100, Math.max(0, (elapsedMs / totalCooldownMs) * 100));

  return {
    isActive,
    remainingMs,
    formattedTime,
    progress
  };
}

/**
 * Check if all cooldowns are complete
 */
export function areAllCooldownsComplete(cooldowns: Record<GameType, number>): boolean {
  return Object.values(cooldowns).every(cooldownEnd => {
    return !cooldownEnd || !isCooldownActive(cooldownEnd);
  });
}

/**
 * Get next game unlock time
 */
export function getNextUnlockTime(cooldowns: Record<GameType, number>): number | null {
  const activeCooldowns = Object.values(cooldowns).filter(cooldownEnd => 
    cooldownEnd && isCooldownActive(cooldownEnd)
  );
  
  if (activeCooldowns.length === 0) {
    return null;
  }
  
  return Math.min(...activeCooldowns);
}

/**
 * Clear cooldown for a specific game
 */
export function clearCooldown(
  gameType: GameType,
  cooldowns: Record<GameType, number>
): Record<GameType, number> {
  const newCooldowns = { ...cooldowns };
  delete newCooldowns[gameType];
  return newCooldowns;
}

/**
 * Set cooldown for a specific game
 */
export function setCooldown(
  gameType: GameType,
  cooldowns: Record<GameType, number>,
  config: CooldownConfig = DEFAULT_COOLDOWN
): Record<GameType, number> {
  return {
    ...cooldowns,
    [gameType]: calculateCooldownEnd(config)
  };
}
