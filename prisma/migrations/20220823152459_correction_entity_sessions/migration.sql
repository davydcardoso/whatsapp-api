/*
  Warnings:

  - You are about to drop the column `sessionJSON` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_company_id_fkey";

-- DropIndex
DROP INDEX "sessions_sessionJSON_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "sessionJSON",
ADD COLUMN     "authenticated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qrcode" TEXT;
