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
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?error=missing', request.url), 303);
  }

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    return NextResponse.redirect(new URL('/login?error=config', request.url), 303);
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
    return NextResponse.redirect(new URL('/login?error=invalid', request.url), 303);
  }

  return NextResponse.redirect(new URL('/app', request.url), 303);
}
