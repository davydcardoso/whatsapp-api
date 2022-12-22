import { Controller } from "@/core/infra/Controller";
import { UpdateCompanyAccessToken } from "@/modules/companies/useCases/UpdateCompanyAccessToken/UpdateCompanyAccessToken";
import { UpdateCompanyAccessTokenController } from "@/modules/companies/useCases/UpdateCompanyAccessToken/UpdateCompanyAccessTokenController";
import { CompaniesRepository } from "../../databases/repositories/CompaniesRepository";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";

export function makeUpdateCompanyAccessTokenController(): Controller {
  return new UpdateCompanyAccessTokenController(
    new UpdateCompanyAccessToken(new CompaniesRepository(ConnectionPrisma))
  );
}
