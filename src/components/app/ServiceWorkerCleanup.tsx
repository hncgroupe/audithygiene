'use client';

import { useEffect } from 'react';

/**
 * Désinstalle tout ancien service worker et vide ses caches. Un précédent SW
 * pouvait servir une version périmée du code (déploiements invisibles sur iOS).
 * On le retire proprement ; aucune UI. À garder tant que des appareils peuvent
 * encore avoir l'ancien worker.
 */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()))
      .catch(() => {});
    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => keys.forEach((k) => caches.delete(k)))
        .catch(() => {});
    }
  }, []);

  return null;
}
