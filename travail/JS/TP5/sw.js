let cacheName = "test";

let cacheRessource = [
    '/tp/tpJS_5/sw/',
    'https://cors-anywhere.herokuapp.com/' + 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu'
]

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheRessource
                /* 
                Ici on ajoute en cache à la création des documents
                [
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/style.css',
                '/sw-test/app.js',
                '/sw-test/image-list.js',
                '/sw-test/star-wars-logo.jpg',
                '/sw-test/gallery/',
                '/sw-test/gallery/bountyHunters.jpg',
                '/sw-test/gallery/myLittleVader.jpg',
                '/sw-test/gallery/snowTroopers.jpg'
                ]
                */
            );
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        /*
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function(response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();
                caches.open(cacheName).then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function() {
                // S'il y a une erreur on reverra toujours cette image...
                return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
        }
        */
        return response || fetch(event.request);
    }));
});