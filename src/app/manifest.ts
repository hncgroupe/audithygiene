import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'audit hygiène',
    short_name: 'audit hygiène',
    description: 'Audit hygiène et HACCP pour restaurants en Île-de-France. Label privé indépendant.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10B981',
    lang: 'fr',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
