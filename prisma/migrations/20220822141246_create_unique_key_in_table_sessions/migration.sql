/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companySecret]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sessions_companyId_key" ON "sessions"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_companySecret_key" ON "sessions"("companySecret");
