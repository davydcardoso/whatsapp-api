import { Either, right } from "@/core/logic/Either";
import { iCompaniesRepository } from "../../repositories/iCompaniesRepository";

type ConfigureOrCreateCompanyWebhookRequest = {
  companyId: string;
  webhook: string;
};

type ConfigureOrCreateCompanyWebhookResponse = Either<Error, object>;

export class ConfigureOrCreateCompanyWebhook {
  constructor(private readonly companiesRepository: iCompaniesRepository) {}

  async perform({
    companyId,
    webhook,
  }: ConfigureOrCreateCompanyWebhookRequest): Promise<ConfigureOrCreateCompanyWebhookResponse> {
    const company = await this;

    return right({});
  }
}
