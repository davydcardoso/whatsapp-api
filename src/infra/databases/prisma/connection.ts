import { PrismaClient } from "@prisma/client";

export const ConnectionPrisma = new PrismaClient(
  process.env.SHOW_SQL_SCRIPTS ? { log: ["query", "info"] } : undefined
);
