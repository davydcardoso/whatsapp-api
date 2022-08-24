import { PrismaClient } from "@prisma/client";

export const ConnectionPrisma = new PrismaClient(
  process.env.API_AMBIENT === "development"
    ? { log: ["query", "info"] }
    : undefined
);
