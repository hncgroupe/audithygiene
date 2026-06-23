-- Sauvegarde Google Drive : dossier "photos" de l'audit (nullable, non bloquant).
ALTER TABLE "audits" ADD COLUMN "driveFolderId" TEXT;
