// ================================
// Rahman QR PWA Service Worker
// Version 1.0
// ================================

const CACHE_NAME = "rahman-qr-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./images/logo.png",
  "./images/behzisti.png",
  "./images/cover.jpg",

  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap"
];

// نصب
self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

  self.skipWaiting();

});

// فعال شدن
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});

// دریافت فایل‌ها
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        if (response) {

          return response;

        }

        return fetch(event.request)

          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)

              .then(cache => {

                cache.put(event.request, responseClone);

              });

            return networkResponse;

          })

          .catch(() => {

            return caches.match("./index.html");

          });

      })

  );

});