// PWA Service Worker Registration and Management

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/Bitsacco-Education-Hub/sw.js', {
        scope: '/Bitsacco-Education-Hub/'
      });
      
      console.log('Service Worker registered successfully:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              showUpdateNotification();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('Service Worker unregistered successfully');
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};

export const showUpdateNotification = (): void => {
  // Create a custom update notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <span>🔄</span>
      <span>New version available!</span>
      <button onclick="window.location.reload()" class="bg-white text-green-500 px-2 py-1 rounded text-sm">
        Update
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 10000);
};

export const checkForAppUpdate = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      return true;
    } catch (error) {
      console.error('Update check failed:', error);
      return false;
    }
  }
  return false;
};

export const isStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission === 'denied') {
    return false;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/Bitsacco-Education-Hub/icon-192x192.png',
      badge: '/Bitsacco-Education-Hub/icon-192x192.png',
      ...options
    });
  }
};

export const getNetworkStatus = (): { online: boolean; effectiveType?: string } => {
  const online = navigator.onLine;
  const effectiveType = (navigator as any).connection?.effectiveType;
  
  return { online, effectiveType };
};

export const addNetworkStatusListener = (callback: (online: boolean) => void): void => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
};
