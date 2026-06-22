import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'audit hygiène',
    short_name: 'audit hygiène',
    description: 'Audit hygiène et HACCP pour restaurants en France. Label privé indépendant.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10B981',
    lang: 'fr',
    categories: ['business', 'food', 'productivity'],
    icons: [
      { src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/favicon.png', sizes: '500x500', type: 'image/png', purpose: 'any' },
      { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
