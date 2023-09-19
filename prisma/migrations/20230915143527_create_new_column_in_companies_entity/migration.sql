/*
  Warnings:

  - A unique constraint covering the columns `[webhook]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `webhook` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "webhook" VARCHAR NOT NULL;

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompaniesToSettings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompaniesToSettings_AB_unique" ON "_CompaniesToSettings"("A", "B");

-- CreateIndex
CREATE INDEX "_CompaniesToSettings_B_index" ON "_CompaniesToSettings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "companies_webhook_key" ON "companies"("webhook");

-- AddForeignKey
ALTER TABLE "_CompaniesToSettings" ADD CONSTRAINT "_CompaniesToSettings_A_fkey" FOREIGN KEY ("A") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompaniesToSettings" ADD CONSTRAINT "_CompaniesToSettings_B_fkey" FOREIGN KEY ("B") REFERENCES "settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
