import { NextResponse, type NextRequest } from 'next/server';

/**
 * Routing par sous-domaine.
 * - app.audithygiene.fr  → réécrit vers /app/* (route group (app), espace protégé).
 * - La redirection audithygiene.com → .fr est gérée dans next.config.mjs (redirects).
 *
 * En local, on accède à l'app via /app directement.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const url = request.nextUrl;

  const isAppSubdomain = host.startsWith('app.');

  if (isAppSubdomain && !url.pathname.startsWith('/app')) {
    url.pathname = `/app${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|llms.txt|robots.txt|sitemap.xml).*)'],
};
