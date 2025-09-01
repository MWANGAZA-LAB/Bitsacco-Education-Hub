// User Data Management System for Real Financial Data
import { FinancialGoal } from '../types/dashboard';
import { logger } from './logger';

export interface UserFinancialData {
  goals: FinancialGoal[];
  metrics: {
    netWorth: number;
    monthlySavings: number;
    savingsRate: number;
    lastUpdated: Date;
  };
  reminders: SavingsReminder[];
  preferences: UserPreferences;
}

export interface SavingsReminder {
  id: string;
  message: string;
  emoji: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastShown: Date;
  isActive: boolean;
}

export interface UserPreferences {
  currency: 'KES' | 'USD';
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
  theme: 'dark' | 'light';
  notifications: boolean;
}

class UserDataManager {
  private readonly STORAGE_KEY = 'bitsacco-user-financial-data';
  private readonly REMINDERS_KEY = 'bitsacco-savings-reminders';

  // Initialize user data
  initializeUserData(): UserFinancialData {
    const existing = this.loadUserData();
    if (existing) {
      return existing;
    }

    const initialData: UserFinancialData = {
      goals: [],
      metrics: {
        netWorth: 0,
        monthlySavings: 0,
        savingsRate: 0,
        lastUpdated: new Date()
      },
      reminders: this.getDefaultReminders(),
      preferences: {
        currency: 'KES',
        reminderFrequency: 'daily',
        theme: 'dark',
        notifications: true
      }
    };

    this.saveUserData(initialData);
    return initialData;
  }

  // Load user data from localStorage
  loadUserData(): UserFinancialData | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored);
      return {
        ...data,
        metrics: {
          ...data.metrics,
          lastUpdated: new Date(data.metrics.lastUpdated)
        },
        reminders: data.reminders.map((r: any) => ({
          ...r,
          lastShown: new Date(r.lastShown)
        }))
      };
    } catch (error) {
      logger.error('Failed to load user data', { error });
      return null;
    }
  }

  // Save user data to localStorage
  saveUserData(data: UserFinancialData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      logger.info('User data saved successfully');
    } catch (error) {
      logger.error('Failed to save user data', { error });
    }
  }

  // Financial Goals Management
  addFinancialGoal(goal: Omit<FinancialGoal, 'id'>): FinancialGoal {
    const data = this.loadUserData() || this.initializeUserData();
    const newGoal: FinancialGoal = {
      ...goal,
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    data.goals.push(newGoal);
    this.saveUserData(data);
    logger.info('Financial goal added', { goalId: newGoal.id });

    return newGoal;
  }

  updateFinancialGoal(goalId: string, updates: Partial<FinancialGoal>): FinancialGoal | null {
    const data = this.loadUserData();
    if (!data) return null;

    const goalIndex = data.goals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) return null;

    data.goals[goalIndex] = { ...data.goals[goalIndex], ...updates };
    this.saveUserData(data);
    logger.info('Financial goal updated', { goalId });

    return data.goals[goalIndex];
  }

  deleteFinancialGoal(goalId: string): boolean {
    const data = this.loadUserData();
    if (!data) return false;

    const initialLength = data.goals.length;
    data.goals = data.goals.filter(g => g.id !== goalId);
    
    if (data.goals.length < initialLength) {
      this.saveUserData(data);
      logger.info('Financial goal deleted', { goalId });
      return true;
    }

    return false;
  }

  getFinancialGoals(): FinancialGoal[] {
    const data = this.loadUserData();
    return data?.goals || [];
  }

  // Financial Metrics Management
  updateFinancialMetrics(metrics: Partial<UserFinancialData['metrics']>): void {
    const data = this.loadUserData() || this.initializeUserData();
    data.metrics = {
      ...data.metrics,
      ...metrics,
      lastUpdated: new Date()
    };
    this.saveUserData(data);
    logger.info('Financial metrics updated', { metrics });
  }

  getFinancialMetrics(): UserFinancialData['metrics'] {
    const data = this.loadUserData();
    return data?.metrics || {
      netWorth: 0,
      monthlySavings: 0,
      savingsRate: 0,
      lastUpdated: new Date()
    };
  }

  // Savings Reminders Management
  getDefaultReminders(): SavingsReminder[] {
    return [
      {
        id: 'daily_savings',
        message: 'Time to save! Every little bit counts towards your goals 💰',
        emoji: '💰',
        frequency: 'daily',
        lastShown: new Date(0),
        isActive: true
      },
      {
        id: 'weekly_progress',
        message: 'Check your savings progress this week! 📊',
        emoji: '📊',
        frequency: 'weekly',
        lastShown: new Date(0),
        isActive: true
      },
      {
        id: 'monthly_goals',
        message: 'Review your monthly savings goals! 🎯',
        emoji: '🎯',
        frequency: 'monthly',
        lastShown: new Date(0),
        isActive: true
      },
      {
        id: 'emergency_fund',
        message: 'Don\'t forget to build your emergency fund! 🛡️',
        emoji: '🛡️',
        frequency: 'weekly',
        lastShown: new Date(0),
        isActive: true
      },
      {
        id: 'bitcoin_education',
        message: 'Learn more about Bitcoin while you save! 🧠',
        emoji: '🧠',
        frequency: 'weekly',
        lastShown: new Date(0),
        isActive: true
      }
    ];
  }

  getActiveReminders(): SavingsReminder[] {
    const data = this.loadUserData();
    if (!data) return this.getDefaultReminders();

    const now = new Date();
    return data.reminders.filter(reminder => {
      if (!reminder.isActive) return false;

      const timeSinceLastShown = now.getTime() - reminder.lastShown.getTime();
      const frequencyMs = this.getFrequencyMs(reminder.frequency);
      
      return timeSinceLastShown >= frequencyMs;
    });
  }

  markReminderShown(reminderId: string): void {
    const data = this.loadUserData();
    if (!data) return;

    const reminder = data.reminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.lastShown = new Date();
      this.saveUserData(data);
      logger.info('Reminder marked as shown', { reminderId });
    }
  }

  addCustomReminder(reminder: Omit<SavingsReminder, 'id'>): SavingsReminder {
    const data = this.loadUserData() || this.initializeUserData();
    const newReminder: SavingsReminder = {
      ...reminder,
      id: `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    data.reminders.push(newReminder);
    this.saveUserData(data);
    logger.info('Custom reminder added', { reminderId: newReminder.id });

    return newReminder;
  }

  updateReminder(reminderId: string, updates: Partial<SavingsReminder>): SavingsReminder | null {
    const data = this.loadUserData();
    if (!data) return null;

    const reminderIndex = data.reminders.findIndex(r => r.id === reminderId);
    if (reminderIndex === -1) return null;

    data.reminders[reminderIndex] = { ...data.reminders[reminderIndex], ...updates };
    this.saveUserData(data);
    logger.info('Reminder updated', { reminderId });

    return data.reminders[reminderIndex];
  }

  deleteReminder(reminderId: string): boolean {
    const data = this.loadUserData();
    if (!data) return false;

    const initialLength = data.reminders.length;
    data.reminders = data.reminders.filter(r => r.id !== reminderId);
    
    if (data.reminders.length < initialLength) {
      this.saveUserData(data);
      logger.info('Reminder deleted', { reminderId });
      return true;
    }

    return false;
  }

  // User Preferences Management
  updatePreferences(preferences: Partial<UserPreferences>): void {
    const data = this.loadUserData() || this.initializeUserData();
    data.preferences = { ...data.preferences, ...preferences };
    this.saveUserData(data);
    logger.info('User preferences updated', { preferences });
  }

  getPreferences(): UserPreferences {
    const data = this.loadUserData();
    return data?.preferences || {
      currency: 'KES',
      reminderFrequency: 'daily',
      theme: 'dark',
      notifications: true
    };
  }

  // Utility Methods
  private getFrequencyMs(frequency: SavingsReminder['frequency']): number {
    switch (frequency) {
      case 'daily': return 24 * 60 * 60 * 1000;
      case 'weekly': return 7 * 24 * 60 * 60 * 1000;
      case 'monthly': return 30 * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  }

  // Clear all user data (for testing/reset)
  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.REMINDERS_KEY);
    logger.info('All user data cleared');
  }

  // Export user data
  exportUserData(): string {
    const data = this.loadUserData();
    return JSON.stringify(data, null, 2);
  }

  // Import user data
  importUserData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.saveUserData(data);
      logger.info('User data imported successfully');
      return true;
    } catch (error) {
      logger.error('Failed to import user data', { error });
      return false;
    }
  }
}

// Create singleton instance
export const userDataManager = new UserDataManager();
