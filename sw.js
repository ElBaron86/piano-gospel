const CACHE = "piano-gospel-5c0cfbb9c9";
const CORE = [
 "./",
 "index.html",
 "rythme.html",
 "harmonie.html",
 "gospel.html",
 "manifest.webmanifest",
 "fonts/bricolage-grotesque-latin-500-normal.woff2",
 "fonts/bricolage-grotesque-latin-ext-500-normal.woff2",
 "fonts/bricolage-grotesque-latin-700-normal.woff2",
 "fonts/bricolage-grotesque-latin-ext-700-normal.woff2",
 "fonts/literata-latin-400-normal.woff2",
 "fonts/literata-latin-ext-400-normal.woff2",
 "fonts/literata-latin-600-normal.woff2",
 "fonts/literata-latin-ext-600-normal.woff2",
 "fonts/literata-latin-400-italic.woff2",
 "fonts/literata-latin-ext-400-italic.woff2",
 "fonts/jetbrains-mono-latin-500-normal.woff2",
 "fonts/jetbrains-mono-latin-ext-500-normal.woff2",
 "fonts/jetbrains-mono-latin-700-normal.woff2",
 "fonts/jetbrains-mono-latin-ext-700-normal.woff2",
 "fonts/noto-music-music-400-normal.woff2",
 "fonts/noto-music-latin-400-normal.woff2",
 "fonts/fonts.css",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/maskable-512.png",
 "icons/apple-touch-icon.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("piano-gospel-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === "basic") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match("./index.html"))));
});
