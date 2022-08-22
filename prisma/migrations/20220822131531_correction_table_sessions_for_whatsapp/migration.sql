/*
  Warnings:

  - You are about to drop the column `companies_Id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionJSON]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companySecret` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionJSON` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_companies_Id_fkey";

-- DropIndex
DROP INDEX "sessions_phone_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "companies_Id",
DROP COLUMN "phone",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "companySecret" TEXT NOT NULL,
ADD COLUMN     "sessionJSON" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionJSON_key" ON "sessions"("sessionJSON");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
