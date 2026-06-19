import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { env } from '@/lib/env';

/** Déconnexion : invalide la session Supabase et nettoie les cookies. */
export async function POST(request: NextRequest) {
  if (env.supabaseUrl && env.supabaseAnonKey) {
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
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL('/login', request.url), 303);
}
