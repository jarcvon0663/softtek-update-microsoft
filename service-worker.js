const CACHE_NAME = 'softtek-cache-v1';
const urlsToCache = [
  '/index.html',
  '/manifest.json',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/logo-softtek.svg',
  '/img/fondo.jpg',
  // Agrega aquí otros archivos esenciales (CSS, JS, etc.)
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retorna la respuesta del cache si existe, de lo contrario realiza la solicitud a la red
        return response || fetch(event.request);
      })
  );
});
