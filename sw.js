// sw.js - Service Worker para GitHub Pages en /CoSys/

const CACHE_NAME = 'cosys-cache-v1';
const APP_SHELL = [
  '/CoSys/',
  '/CoSys/index.html',
  '/CoSys/manifest.json',
  '/CoSys/styles.css',         // Añade si tienes
  '/CoSys/app.js',             // Añade si tienes
  '/CoSys/images/djp192.png',
  '/CoSys/images/djp512.png',
  '/CoSys/images/noperfil.png'
  // Agrega más recursos estáticos si usas otros (como fuentes locales o más imágenes)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Si no hay red y falla, regresa la app shell
        return caches.match('/CoSys/index.html');
      });
    })
  );
});
