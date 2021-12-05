//create AppShell
const _cacheName = 'dande@v1-cache-10a_v1';
self.addEventListener('install', () => {
    console.log('install');

    caches.open('dande@v1-cache-10a_v1').
        then(e => {
            e.add('index.html');
            e.add('formulario.html');
        });
});
self.addEventListener('activate', () => {
    console.log('Se ha activado el serviceworker')
});
//En respuesta a la red
  self.addEventListener('fetch', event => {
      event.respondWith(
          caches.match(event.request).then(cacheResponse => {
              return cacheResponse || fetch(event.request)
          })
      )
})
self.addEventListener('fetch', evt=> {
    if(isSuperImportant(evt.request)) {
      evt.respondWith(Promise.resolve(new Response({status: 201})));
      evt.waitUntil(
        myEnqueue(evt.request).then(()=> {
          return self.registration.sync.register('sync-tag'); 
        })
      );
    }
    else {
      // process the non-important requests
    }
  });
  
  
  self.addEventListener('sync', evt=> {
    evt.waitUntil(tryToFlushMyQueue());
  });