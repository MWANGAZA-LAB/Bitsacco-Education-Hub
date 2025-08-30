interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  userId?: string;
  gameType?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private logToConsole(entry: LogEntry) {
    const { level, message, timestamp, ...rest } = entry;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (this.isDevelopment) {
      console[level](`${prefix} ${message}`, rest);
    } else {
      // In production, only log errors and warnings
      if (level === 'error' || level === 'warn') {
        console[level](`${prefix} ${message}`, rest);
      }
    }
  }

  private logToService(entry: LogEntry) {
    // In production, send to monitoring service (Sentry, LogRocket, etc.)
    if (!this.isDevelopment && entry.level === 'error') {
      // Example: Sentry.captureException(new Error(entry.message));
      console.error('Production error logged:', entry);
    }
  }

  log(level: LogEntry['level'], message: string, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...metadata
    };

    this.logToConsole(entry);
    this.logToService(entry);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (this.isDevelopment) {
      this.log('debug', message, metadata);
    }
  }
}

export const logger = new Logger();
