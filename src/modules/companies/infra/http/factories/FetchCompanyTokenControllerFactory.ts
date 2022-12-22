import { Controller } from "@/core/infra/Controller";
import { FetchCompanyToken } from "@/modules/companies/useCases/FetchCompanyToken/FetchCompanyToken";
import { FetchCompanyTokenController } from "@/modules/companies/useCases/FetchCompanyToken/FetchCompanyTokenController";
import { CompaniesRepository } from "../../databases/repositories/CompaniesRepository";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";

export function makeFetchCompanyTokenController(): Controller {
  return new FetchCompanyTokenController(
    new FetchCompanyToken(new CompaniesRepository(ConnectionPrisma))
  );
}
