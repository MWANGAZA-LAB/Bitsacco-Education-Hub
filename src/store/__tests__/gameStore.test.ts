import { renderHook, act } from '@testing-library/react';
import { useGameStore } from '../gameStore';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('GameStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('should initialize with default state', () => {
    const { result } = renderHook(() => useGameStore());
    
    expect(result.current.savingsGoal).toBeNull();
    expect(result.current.currentGame).toBeNull();
    expect(result.current.userProgress.totalKESEarned).toBe(0);
    expect(result.current.userProgress.totalGamesPlayed).toBe(0);
  });

  test('should set savings goal with valid data', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.setSavingsGoal(2000, 'september');
    });
    
    expect(result.current.savingsGoal).toEqual({
      targetKES: 2000,
      month: 'september'
    });
  });

  test('should throw error for invalid savings goal', () => {
    const { result } = renderHook(() => useGameStore());
    
    expect(() => {
      act(() => {
        result.current.setSavingsGoal(100, 'september'); // Below minimum
      });
    }).toThrow('Target must be between 500 and 2,000 KES for september');
  });

  test('should update progress when playing games', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.updateSavingsProgress(100);
    });
    
    expect(result.current.userProgress.totalKESEarned).toBe(100);
    expect(result.current.userProgress.totalGamesPlayed).toBe(1);
  });

  test('should handle game cooldowns correctly', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.playGame('rollDice');
    });
    
    const status = result.current.getGameStatus('rollDice');
    expect(status.cooldownUntil).toBeGreaterThan(Date.now());
  });

  test('should not set cooldown for educational games', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.playGame('snakeSats');
    });
    
    const status = result.current.getGameStatus('snakeSats');
    expect(status.cooldownUntil).toBeNull();
  });

  test('should track game play counts', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.playGame('rollDice');
      result.current.playGame('rollDice');
    });
    
    expect(result.current.getGamePlayCount('rollDice')).toBe(2);
  });

  test('should reset progress correctly', () => {
    const { result } = renderHook(() => useGameStore());
    
    // Set some state
    act(() => {
      result.current.setSavingsGoal(2000, 'september');
      result.current.updateSavingsProgress(100);
      result.current.playGame('rollDice');
    });
    
    // Reset
    act(() => {
      result.current.resetProgress();
    });
    
    expect(result.current.savingsGoal).toBeNull();
    expect(result.current.userProgress.totalKESEarned).toBe(0);
    expect(result.current.getGamePlayCount('rollDice')).toBe(0);
  });

  test('should validate game types', () => {
    const { result } = renderHook(() => useGameStore());
    
    expect(() => {
      act(() => {
        result.current.setCurrentGame('invalidGame' as any);
      });
    }).toThrow('Invalid game type');
  });
});
