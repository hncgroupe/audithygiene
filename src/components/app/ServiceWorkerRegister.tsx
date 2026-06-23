'use client';

import { useEffect } from 'react';

/**
 * Enregistre le service worker de l'app (mode hors-ligne en cuisine).
 * Monté uniquement dans l'espace /app. Aucune UI.
 *
 * On NE force PAS de rechargement automatique quand une nouvelle version arrive :
 * cela couperait l'auditeur en plein audit. La nouvelle version (réseau d'abord)
 * s'applique naturellement au prochain chargement, sans figer l'ancien code.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* échec d'enregistrement : l'app fonctionne quand même en ligne */
      });
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }, []);

  return null;
}
