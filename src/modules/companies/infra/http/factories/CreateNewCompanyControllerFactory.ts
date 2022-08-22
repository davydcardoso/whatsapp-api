import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { CreateNewCompany } from "@/modules/companies/useCases/CreateNewCompany/CreateNewCompany";
import { CreateNewCompanyController } from "@/modules/companies/useCases/CreateNewCompany/CreateNewCompanyController";
import { CompaniesRepository } from "../../databases/repositories/CompaniesRepository";

export function makeCreateNewCompanyController(): Controller {
  const companiesRepository = new CompaniesRepository(ConnectionPrisma);

  return new CreateNewCompanyController(
    new CreateNewCompany(companiesRepository)
  );
}
