/* Offline cache. Při každé úpravě souborů zvyš číslo verze. */
const VERSION = "akvarium-v2";
const SHELL = [
  "./", "./index.html", "./app.js", "./config.js", "./manifest.webmanifest",
  "./vendor/three.min.js", "./vendor/supabase.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png",
  "./fonts/baloo-2-latin-800-normal.woff2", "./fonts/baloo-2-latin-ext-800-normal.woff2",
  "./fonts/nunito-latin-700-normal.woff2", "./fonts/nunito-latin-ext-700-normal.woff2"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // Supabase a vše cizí jde vždy po síti
  e.respondWith(
    fetch(req).then(res => {                                // network-first: online vždy čerstvé
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
