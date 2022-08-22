import { Middleware } from "@/core/infra/Middleware";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { CompaniesRepository } from "@/modules/companies/infra/databases/repositories/CompaniesRepository";
import { AuthenticationMiddleware } from "../../middlewares/AuthentucateMiddlaware";

export function makeAuthenticatedMiddleware(): Middleware {
  const companiesRepository = new CompaniesRepository(ConnectionPrisma);

  return new AuthenticationMiddleware(companiesRepository);
}
