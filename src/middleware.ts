import { NextResponse, type NextRequest } from 'next/server';

/**
 * Routing par sous-domaine.
 * - app.audithygiene.fr → la racine "/" affiche le tableau de bord (réécrit vers /app).
 *   Les routes /app/*, /login et /api/* passent telles quelles (sinon /login serait
 *   réécrit en /app/login et la connexion casserait).
 * - La redirection audithygiene.com → .fr est gérée dans next.config.mjs (redirects).
 *
 * En local, on accède à l'app via /app directement.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const url = request.nextUrl;

  const isAppSubdomain = host.startsWith('app.');

  if (isAppSubdomain && url.pathname === '/') {
    url.pathname = '/app';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|llms.txt|robots.txt|sitemap.xml).*)'],
};
