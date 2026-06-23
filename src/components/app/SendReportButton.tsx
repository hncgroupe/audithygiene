'use client';

import { useState } from 'react';

interface Props {
  auditId: string;
  className?: string;
}

/** Génère et envoie le rapport PDF par email (équipe + destinataires du rapport). */
export function SendReportButton({ auditId, className }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState<string>('');

  async function send() {
    setState('sending');
    setMsg('');
    try {
      const res = await fetch(`/api/audits/${auditId}/rapport/send`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState('sent');
        setMsg(`Envoyé à ${(data.recipients ?? []).length} destinataire(s).`);
      } else {
        setState('error');
        setMsg(data.error ?? "Échec de l'envoi.");
      }
    } catch {
      setState('error');
      setMsg('Erreur réseau.');
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      {msg && (
        <span className={`text-xs ${state === 'error' ? 'text-red-600' : 'text-gris'}`}>{msg}</span>
      )}
      <button
        type="button"
        onClick={send}
        disabled={state === 'sending'}
        className={className}
      >
        {state === 'sending'
          ? 'Envoi…'
          : state === 'sent'
            ? 'Renvoyer le PDF'
            : 'Envoyer le rapport (PDF)'}
      </button>
    </span>
  );
}
