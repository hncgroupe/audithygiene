import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { env } from '@/lib/env';

/**
 * Connexion auditeur (Supabase Auth, email + mot de passe).
 * Le formulaire de /login poste ici. En cas de succès, la session est posée
 * dans des cookies httpOnly et l'utilisateur est redirigé vers /app.
 */
export async function POST(request: NextRequest) {
  // Origine réelle d'après le header Host (le bind -H 0.0.0.0 fausse request.url en dev).
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.host;
  const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '') ?? 'http';
  const origin = `${proto}://${host}`;

  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?error=missing', origin), 303);
  }

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    return NextResponse.redirect(new URL('/login?error=config', origin), 303);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet: { name: string; value: string; options?: object }[]) =>
        toSet.forEach(({ name, value, options }) =>
          cookieStore.set({ name, value, ...(options ?? {}) }),
        ),
    },
  });

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.redirect(new URL('/login?error=invalid', origin), 303);
  }

  return NextResponse.redirect(new URL('/app', origin), 303);
}
