/*
  Warnings:

  - You are about to drop the column `companiesId` on the `sessions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('SENT', 'RECEIVED');

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_companiesId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "companiesId",
ADD COLUMN     "companies_Id" TEXT;

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "whatsapp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "body" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_whatsapp_id_key" ON "Contact"("whatsapp_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_companies_Id_fkey" FOREIGN KEY ("companies_Id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
