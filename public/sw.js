const CACHE_NAME = 'taskme-cache-v1'
const FILES_TO_CACHE = [
  '/', 
  '/index.html',
  '/static/js/bundle.js',
  // add any other assets you need
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  )
})
