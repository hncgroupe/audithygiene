/*
 * KILL SWITCH du service worker.
 *
 * Le précédent service worker mettait en cache des assets et pouvait servir une
 * ANCIENNE version du code (déploiements invisibles, surtout sur iOS). On le
 * neutralise : ce worker se désinstalle lui-même, vide tous les caches, et
 * recharge les pages pour qu'elles repartent sur le code à jour depuis le réseau.
 *
 * Tout appareil ayant encore l'ancien worker récupérera ce fichier (le navigateur
 * vérifie /sw.js à chaque navigation), l'installera, et se nettoiera tout seul.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {
        /* ignore */
      }
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        try {
          client.navigate(client.url);
        } catch {
          /* ignore */
        }
      }
    })()
  );
});

// Réseau direct, aucun cache.
self.addEventListener('fetch', () => {});
