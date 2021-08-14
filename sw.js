const cacheName = `excolada-v1-01-00`
const staticAssets = [
  `./`,
  `./index.html`,
  `./assets/css/main.css`,
  `./assets/icon/favicon.ico`,
  `./assets/icon/logo192.png`,
  `./assets/icon/logo512.png`,
  `./assets/js/App.js`,
  `./assets/js/script.js`,
  `./assets/js/setupEditor.js`,
  `./manifest.webmanifest`,
  `./_snowpack/pkg/@codemirror/basic-setup.js`,
  `./_snowpack/pkg/@codemirror/commands.js`,
  `./_snowpack/pkg/@codemirror/lang-json.js`,
  `./_snowpack/pkg/bootstrap/dist/css/bootstrap.min.css`,
  `./_snowpack/pkg/bootstrap/dist/css/bootstrap.min.css.proxy.js`,
  `./_snowpack/pkg/axios.js`,
  `./_snowpack/pkg/bootstrap.js`,
  `./_snowpack/pkg/pretty-bytes.js`,
  `./_snowpack/pkg/common/index-03e34327.js`,
  `./_snowpack/pkg/common/index-51f174fb.js`,
  `./_snowpack/pkg/common/index-30707b52.js`,
  `./_snowpack/pkg/common/index-c3afca44.js`,
  `./_snowpack/pkg/common/process-2545f00a.js`,
]

self.addEventListener(`install`, async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener(`activate`, e => {
  self.clients.claim();
});

self.addEventListener(`fetch`, async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

const cacheFirst = async (req) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

const networkAndCache = async (req) => {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}