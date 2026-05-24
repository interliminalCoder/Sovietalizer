const CACHE = 'sovietalizer-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        return caches.open(CACHE).then((cache) => {
          if (event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, response.clone())
          }
          return response
        })
      })
    })
  )
})
