-- AlterTable
ALTER TABLE "audits" ADD COLUMN     "emailsRapport" TEXT[] DEFAULT ARRAY[]::TEXT[];
