const CACHE_NAME = 'bitsacco-v1.0.0';
const urlsToCache = [
  '/Bitsacco-Education-Hub/',
  '/Bitsacco-Education-Hub/index.html',
  '/Bitsacco-Education-Hub/static/js/bundle.js',
  '/Bitsacco-Education-Hub/static/css/main.css',
  '/Bitsacco-Education-Hub/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline actions when connection is restored
  console.log('Background sync triggered');
  // TODO: Implement offline action handling
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/Bitsacco-Education-Hub/icon-192x192.png',
    badge: '/Bitsacco-Education-Hub/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/Bitsacco-Education-Hub/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/Bitsacco-Education-Hub/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Bitsacco Financial Hub', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/Bitsacco-Education-Hub/')
    );
  }
});
