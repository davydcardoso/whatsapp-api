import { PrismaClient } from "@prisma/client";

export const ConnectionPrisma = new PrismaClient({ log: ["query", "info"] });
