import { Either, right } from "@/core/logic/Either";

type ConfigureOrCreateCompanyWebhookRequest = {
  companyId: string;
  webhook: string;
};

type ConfigureOrCreateCompanyWebhookResponse = Either<Error, object>;

export class ConfigureOrCreateCompanyWebhook {
  async perform({}: ConfigureOrCreateCompanyWebhookRequest): Promise<ConfigureOrCreateCompanyWebhookResponse> {
    return right({});
  }
}
