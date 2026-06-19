import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import { ReportDocument, type ReportData } from './ReportDocument';
import { uploadReport } from '@/lib/supabase';

/**
 * Génère le PDF du rapport en mémoire (Buffer). Compatible serverless (Node runtime).
 */
export async function renderReport(data: ReportData): Promise<Buffer> {
  // createElement évite d'imposer le JSX dans un fichier .ts
  const element = createElement(ReportDocument, { data });
  // @react-pdf/renderer accepte un élément Document
  return renderToBuffer(element as Parameters<typeof renderToBuffer>[0]);
}

/**
 * Génère + téléverse le rapport dans le bucket privé Supabase.
 * Retourne le chemin de stockage, ou null en cas d'échec.
 */
export async function generateAndStoreReport(
  auditId: string,
  data: ReportData
): Promise<{ path: string; fileName: string } | null> {
  const buffer = await renderReport(data);
  const fileName = `rapport-${auditId}.pdf`;
  const path = `audits/${auditId}/${fileName}`;
  const ok = await uploadReport(path, buffer);
  if (!ok) return null;
  return { path, fileName };
}
