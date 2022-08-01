importScripts('workbox-v6.5.4/workbox-sw.js');
workbox.setConfig({
    modulePathPrefix: 'workbox-v6.5.4/',
});

self.addEventListener('message', ({ data }) => {
    if (data === 'skipWaiting') {
        self.skipWaiting();
    }
});

// the precache manifest will be injected into the following line
self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
