-- CreateTable
CREATE TABLE "session_qrcode" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_qrcode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_qrcode_company_id_key" ON "session_qrcode"("company_id");
