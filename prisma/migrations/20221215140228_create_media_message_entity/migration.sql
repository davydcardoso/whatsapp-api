-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "isMedia" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "session_qrcode" ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "media_messages" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mimetype" VARCHAR NOT NULL,
    "destination" TEXT NOT NULL,
    "created_at" DATE,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_messages_pkey" PRIMARY KEY ("id")
);
