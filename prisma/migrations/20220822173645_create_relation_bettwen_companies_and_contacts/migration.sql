/*
  Warnings:

  - You are about to drop the column `companyId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `companySecret` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_secret]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_secret` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_companyId_fkey";

-- DropIndex
DROP INDEX "sessions_companyId_key";

-- DropIndex
DROP INDEX "sessions_companySecret_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "companyId",
DROP COLUMN "companySecret",
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "company_secret" TEXT NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "whatsapp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_whatsapp_id_key" ON "contacts"("whatsapp_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_company_id_key" ON "sessions"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_company_secret_key" ON "sessions"("company_secret");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
