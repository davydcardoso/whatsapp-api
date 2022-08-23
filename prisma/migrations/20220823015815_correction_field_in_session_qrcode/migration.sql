/*
  Warnings:

  - You are about to drop the column `token` on the `session_qrcode` table. All the data in the column will be lost.
  - Added the required column `qrcode` to the `session_qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_qrcode" DROP COLUMN "token",
ADD COLUMN     "qrcode" TEXT NOT NULL;
