/*
 * Service worker de l'app d'audit (app.audithygiene.fr).
 *
 * But : que l'auditeur puisse OUVRIR l'app même avec un réseau mort en cuisine,
 * sans jamais se retrouver coincé avec une ancienne version du code.
 *
 * Stratégie (anti "code périmé") :
 *  - Navigations (HTML) : réseau d'abord, cache en secours seulement hors-ligne.
 *    => en ligne, l'auditeur a TOUJOURS la dernière version déployée.
 *  - Assets Next hachés (/_next/static/...) : cache d'abord (le hash garantit
 *    qu'un nouveau build a de nouvelles URL, donc jamais de collision).
 *  - Autres GET même origine (images, polices, manifest) : stale-while-revalidate.
 *  - /api/ et tout ce qui n'est pas GET : réseau uniquement, jamais mis en cache.
 *
 * skipWaiting + clients.claim : la nouvelle version prend la main au plus vite.
 */

const VERSION = 'v1';
const SHELL_CACHE = `ah-shell-${VERSION}`;
const ASSET_CACHE = `ah-assets-${VERSION}`;
const OFFLINE_FALLBACK = '/app/audits';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // On pré-charge une page d'app comme secours hors-ligne (best-effort).
      await cache.add(OFFLINE_FALLBACK).catch(() => {});
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Purge des anciens caches d'autres versions.
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('ah-') && !k.endsWith(VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isHashedAsset(url) {
  return url.pathname.startsWith('/_next/static/');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // jamais de cache sur POST/PATCH/DELETE

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // tiers : laisser passer
  if (url.pathname.startsWith('/api/')) return; // API : réseau only

  // 1) Navigations : réseau d'abord, secours cache uniquement si hors-ligne.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          // On garde la dernière page d'app comme secours hors-ligne.
          if (fresh && fresh.ok && url.pathname.startsWith('/app')) {
            const cache = await caches.open(SHELL_CACHE);
            cache.put(OFFLINE_FALLBACK, fresh.clone()).catch(() => {});
          }
          return fresh;
        } catch {
          const cache = await caches.open(SHELL_CACHE);
          const cached = (await cache.match(req)) || (await cache.match(OFFLINE_FALLBACK));
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // 2) Assets hachés : cache d'abord (immuables).
  if (isHashedAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSET_CACHE);
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
        return res;
      })()
    );
    return;
  }

  // 3) Autres GET même origine : stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(ASSET_CACHE);
      const hit = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
          return res;
        })
        .catch(() => null);
      return hit || (await network) || Response.error();
    })()
  );
});
