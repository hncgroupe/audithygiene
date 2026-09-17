'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  auditId: string;
  /** URL signée du logo déjà en place, s'il y en a un. */
  logoUrl?: string | null;
}

const TAILLE_MAX = 2_000_000;

/**
 * Pose ou remplace le logo du client sur la couverture du rapport, depuis
 * l'écran du rapport et avant de télécharger le PDF.
 *
 * Le fichier passe par un <label> natif plutôt que par un .click() programmatique :
 * sur iPhone, le clic déclenché en JavaScript n'ouvre pas le sélecteur.
 */
export function LogoClientButton({ auditId, logoUrl }: Props) {
  const router = useRouter();
  const champId = useId();
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'erreur'>('repos');
  const [message, setMessage] = useState('');

  async function envoyer(fichier: File) {
    if (!fichier.type.startsWith('image/')) {
      setEtat('erreur');
      setMessage('Choisissez une image.');
      return;
    }
    if (fichier.size > TAILLE_MAX) {
      setEtat('erreur');
      setMessage('Image trop lourde, 2 Mo maximum.');
      return;
    }
    setEtat('envoi');
    setMessage('');
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const lecteur = new FileReader();
        lecteur.onload = () => resolve(String(lecteur.result));
        lecteur.onerror = () => reject(new Error('lecture'));
        lecteur.readAsDataURL(fichier);
      });
      const res = await fetch(`/api/audits/${auditId}/logo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo: dataUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setEtat('erreur');
        setMessage(data.error ?? "Le logo n'a pas pu être enregistré.");
        return;
      }
      setEtat('repos');
      router.refresh();
    } catch {
      setEtat('erreur');
      setMessage('Erreur réseau.');
    }
  }

  async function retirer() {
    setEtat('envoi');
    setMessage('');
    try {
      const res = await fetch(`/api/audits/${auditId}/logo`, { method: 'DELETE' });
      if (!res.ok) {
        setEtat('erreur');
        setMessage("Le logo n'a pas pu être retiré.");
        return;
      }
      setEtat('repos');
      router.refresh();
    } catch {
      setEtat('erreur');
      setMessage('Erreur réseau.');
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      {message && (
        <span className={`text-xs ${etat === 'erreur' ? 'text-red-600' : 'text-gris'}`}>{message}</span>
      )}

      {logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt="Logo du client"
          className="h-7 w-auto max-w-[80px] rounded border border-ink/10 bg-white object-contain p-0.5"
        />
      )}

      <input
        id={champId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (f) void envoyer(f);
        }}
      />
      <label
        htmlFor={champId}
        className="cursor-pointer rounded-full px-4 py-2 text-sm text-gris transition-colors hover:bg-ink/5 hover:text-ink"
      >
        {etat === 'envoi' ? 'Enregistrement…' : logoUrl ? 'Changer le logo' : 'Ajouter le logo du client'}
      </label>

      {logoUrl && etat !== 'envoi' && (
        <button
          type="button"
          onClick={() => void retirer()}
          className="rounded-full px-3 py-2 text-sm text-gris transition-colors hover:bg-ink/5 hover:text-ink"
        >
          Retirer
        </button>
      )}
    </span>
  );
}
