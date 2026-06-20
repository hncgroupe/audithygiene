import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'audit hygiène - audit HACCP pour restaurants en France';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph générée à la marque (aperçu social pour partages/IA). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0C1B17',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              color: 'white',
            }}
          >
            ✓
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: 'white', display: 'flex' }}>
            audit <span style={{ color: '#10B981', marginLeft: 12 }}>hygiène</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: 'white', lineHeight: 1.1 }}>
            Anticipez le contrôle sanitaire.
          </div>
          <div style={{ fontSize: 32, color: '#9AA8A3', marginTop: 24 }}>
            Audit hygiène et HACCP pour restaurants, partout en France.
          </div>
        </div>

        <div style={{ fontSize: 24, color: '#6B7D77', display: 'flex' }}>
          Label privé indépendant · audithygiene.fr
        </div>
      </div>
    ),
    size
  );
}
