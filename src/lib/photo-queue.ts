/**
 * File d'attente photo persistante (IndexedDB) - le "back de sauvetage".
 * À la prise de vue, le blob est stocké localement : il survit au rechargement,
 * à la fermeture de l'app et à l'absence de réseau. Le moteur de sync de
 * l'assistant d'audit vide cette file dès que la connexion revient.
 *
 * Tout est tolérant aux pannes : si IndexedDB est indisponible, les fonctions
 * échouent en silence sans casser la prise de photo (aperçu mémoire conservé).
 */

const DB_NAME = 'audithygiene-photos';
const STORE = 'queue';
const DB_VERSION = 1;

export interface QueuedPhoto {
  localId: string;
  auditId: string;
  code: string;
  blob: Blob;
  type: string;
  createdAt: number;
}

function hasIDB(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

/**
 * Compresse/redimensionne une photo côté client avant upload (gros gain de vitesse :
 * une photo de smartphone passe de plusieurs Mo à ~200-500 Ko). Respecte l'orientation EXIF.
 * Renvoie le fichier original si la compression échoue ou si ce n'est pas une image.
 */
export async function compressImage(file: Blob, maxDim = 1600, quality = 0.7): Promise<Blob> {
  if (typeof document === 'undefined' || !file.type.startsWith('image/')) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
    // On ne garde la version compressée que si elle est réellement plus légère.
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'localId' });
        store.createIndex('auditId', 'auditId', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function enqueuePhoto(rec: QueuedPhoto): Promise<void> {
  if (!hasIDB()) return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(rec);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    /* IndexedDB indisponible : on ne bloque pas la prise de photo */
  }
}

export async function removePhoto(localId: string): Promise<void> {
  if (!hasIDB()) return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(localId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    /* ignoré */
  }
}

/** Photos encore en attente d'upload pour un audit donné. */
export async function pendingForAudit(auditId: string): Promise<QueuedPhoto[]> {
  if (!hasIDB()) return [];
  try {
    const db = await openDb();
    const all = await new Promise<QueuedPhoto[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).index('auditId').getAll(auditId);
      req.onsuccess = () => resolve(req.result as QueuedPhoto[]);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return all.sort((a, b) => a.createdAt - b.createdAt);
  } catch {
    return [];
  }
}
