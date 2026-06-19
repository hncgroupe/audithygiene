/**
 * Crée (ou met à jour) un auditeur ADMIN : compte Supabase Auth + record Prisma User lié.
 * Usage : npx tsx scripts/create-admin.ts <email> <password> "<Nom>"
 *
 * Idempotent : si l'utilisateur Supabase existe déjà, on réinitialise son mot de passe
 * et on resynchronise le record Prisma.
 */
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const [, , emailArg, passwordArg, nameArg, roleArg] = process.argv;
const email = (emailArg ?? '').trim().toLowerCase();
const password = passwordArg ?? '';
const name = nameArg ?? 'Auditeur';
const role = roleArg === 'AUDITEUR' ? 'AUDITEUR' : 'ADMIN';

if (!email || !password) {
  console.error('Usage : npx tsx scripts/create-admin.ts <email> <password> "<Nom>" [ADMIN|AUDITEUR]');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('[create-admin] NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local');
  process.exit(1);
}

const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
const prisma = new PrismaClient();

async function findAuthUserByEmail(targetEmail: string): Promise<string | null> {
  // Parcourt les pages d'utilisateurs Auth (pas de getByEmail direct dans l'API admin v2).
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => (u.email ?? '').toLowerCase() === targetEmail);
    if (found) return found.id;
    if (data.users.length < 200) break;
  }
  return null;
}

async function main() {
  let authId = await findAuthUserByEmail(email);

  if (authId) {
    const { error } = await admin.auth.admin.updateUserById(authId, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log(`[create-admin] Utilisateur Supabase existant mis à jour : ${authId}`);
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role },
    });
    if (error) throw error;
    authId = data.user.id;
    console.log(`[create-admin] Utilisateur Supabase créé : ${authId}`);
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, role, active: true, authId },
    create: { email, name, role, active: true, authId },
  });
  console.log(`[create-admin] Record Prisma synchronisé : ${user.id} (${user.role})`);

  await prisma.$disconnect();
  console.log(`\n✅ Compte ${role} prêt.`);
  console.log(`   Email    : ${email}`);
  console.log(`   Mot de passe : ${password}`);
}

main().catch(async (e) => {
  console.error('[create-admin] Échec :', e?.message ?? e);
  await prisma.$disconnect();
  process.exit(1);
});
