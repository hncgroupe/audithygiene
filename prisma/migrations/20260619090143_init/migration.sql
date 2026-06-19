-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUDITEUR');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NOUVEAU', 'CONTACTE', 'RDV_PRIS', 'CONVERTI', 'PERDU');

-- CreateEnum
CREATE TYPE "EstablishmentType" AS ENUM ('RESTAURANT', 'RESTAURATION_RAPIDE', 'DARK_KITCHEN', 'BOULANGERIE', 'TRAITEUR', 'HOTEL_RESTAURANT', 'BAR', 'AUTRE');

-- CreateEnum
CREATE TYPE "BesoinType" AS ENUM ('URGENT', 'PREVENTIF');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('DEMANDE', 'CONFIRME', 'REALISE', 'ANNULE');

-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('PLANIFIE', 'EN_COURS', 'TERMINE', 'RAPPORT_ENVOYE');

-- CreateEnum
CREATE TYPE "ItemConformity" AS ENUM ('CONFORME', 'NC_MINEURE', 'NC_MAJEURE', 'NON_APPLICABLE', 'NON_EVALUE');

-- CreateEnum
CREATE TYPE "Priorite" AS ENUM ('HAUTE', 'MOYENNE', 'BASSE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('EN_ATTENTE', 'PAYE', 'ECHOUE', 'REMBOURSE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'AUDITEUR',
    "authId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "ville" TEXT,
    "codePostal" TEXT,
    "departement" TEXT,
    "typeEtablissement" "EstablishmentType",
    "nombreCouverts" INTEGER,
    "besoin" "BesoinType",
    "formule" TEXT,
    "message" TEXT,
    "source" TEXT,
    "statut" "LeadStatus" NOT NULL DEFAULT 'NOUVEAU',
    "consentementRGPD" BOOLEAN NOT NULL DEFAULT false,
    "consentementAt" TIMESTAMP(3),
    "consentementMarketing" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "auditeurId" TEXT,
    "dateSouhaitee" TIMESTAMP(3),
    "dateConfirmee" TIMESTAMP(3),
    "adresse" TEXT,
    "statut" "AppointmentStatus" NOT NULL DEFAULT 'DEMANDE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "siret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "establishments" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "EstablishmentType" NOT NULL DEFAULT 'RESTAURANT',
    "adresse" TEXT,
    "ville" TEXT,
    "codePostal" TEXT,
    "departement" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audits" (
    "id" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "auditeurId" TEXT NOT NULL,
    "grilleVersion" TEXT NOT NULL DEFAULT 'v0-draft',
    "statut" "AuditStatus" NOT NULL DEFAULT 'PLANIFIE',
    "dateAudit" TIMESTAMP(3),
    "scoreGlobal" DOUBLE PRECISION,
    "nbCasCritiques" INTEGER NOT NULL DEFAULT 0,
    "prochainAuditLe" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_items" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "referenceRegl" TEXT,
    "conformite" "ItemConformity" NOT NULL DEFAULT 'NON_EVALUE',
    "ponderation" INTEGER NOT NULL DEFAULT 1,
    "commentaire" TEXT,
    "photoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "valeur" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "non_conformities" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "critique" BOOLEAN NOT NULL DEFAULT false,
    "actionCorrective" TEXT,
    "priorite" "Priorite" NOT NULL DEFAULT 'MOYENNE',
    "delaiJours" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "non_conformities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "envoyeAu" TEXT,
    "envoyeLe" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "montantCents" INTEGER NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'eur',
    "statut" "PaymentStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "stripeSessionId" TEXT,
    "stripePaymentIntent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");

-- CreateIndex
CREATE INDEX "leads_statut_idx" ON "leads"("statut");

-- CreateIndex
CREATE INDEX "leads_departement_idx" ON "leads"("departement");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_leadId_key" ON "appointments"("leadId");

-- CreateIndex
CREATE INDEX "appointments_statut_idx" ON "appointments"("statut");

-- CreateIndex
CREATE INDEX "establishments_departement_idx" ON "establishments"("departement");

-- CreateIndex
CREATE INDEX "audits_statut_idx" ON "audits"("statut");

-- CreateIndex
CREATE INDEX "audit_items_auditId_idx" ON "audit_items"("auditId");

-- CreateIndex
CREATE INDEX "audit_items_theme_idx" ON "audit_items"("theme");

-- CreateIndex
CREATE UNIQUE INDEX "scores_auditId_theme_key" ON "scores"("auditId", "theme");

-- CreateIndex
CREATE INDEX "non_conformities_auditId_idx" ON "non_conformities"("auditId");

-- CreateIndex
CREATE INDEX "non_conformities_critique_idx" ON "non_conformities"("critique");

-- CreateIndex
CREATE UNIQUE INDEX "reports_auditId_key" ON "reports"("auditId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeSessionId_key" ON "payments"("stripeSessionId");

-- CreateIndex
CREATE INDEX "payments_statut_idx" ON "payments"("statut");

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_auditeurId_fkey" FOREIGN KEY ("auditeurId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "establishments" ADD CONSTRAINT "establishments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_auditeurId_fkey" FOREIGN KEY ("auditeurId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_items" ADD CONSTRAINT "audit_items_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "audits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "audits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "non_conformities" ADD CONSTRAINT "non_conformities_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "audits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "audits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
