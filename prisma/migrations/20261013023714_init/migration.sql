-- CreateTable
CREATE TABLE "visitantes" (
    "id" SERIAL NOT NULL,
    "ticket" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "role" TEXT,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitantes_ticket_key" ON "visitantes"("ticket");

-- CreateIndex
CREATE INDEX "visitantes_createdAt_idx" ON "visitantes"("createdAt");
