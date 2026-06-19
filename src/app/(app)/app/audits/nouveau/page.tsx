import { redirect } from 'next/navigation';
import { getCurrentDbUser } from '@/lib/auth';
import { NewAuditForm } from '@/components/app/NewAuditForm';

export const dynamic = 'force-dynamic';

export default async function NouvelAuditPage() {
  const user = await getCurrentDbUser();
  if (!user) redirect('/login');
  return <NewAuditForm />;
}
