import { Controller } from "@/core/infra/Controller";
import { ConfigureOrCreateCompanyWebhook } from "@/modules/companies/useCases/ConfigureOrCreateCompanyWebhook/ConfigureOrCreateCompanyWebhook";
import { ConfigureOrCreateCompanyWebhookController } from "@/modules/companies/useCases/ConfigureOrCreateCompanyWebhook/ConfigureOrCreateCompanyWebhookController";

export function makeConfigureOrCreateCompanyWebhookController(): Controller {
  return new ConfigureOrCreateCompanyWebhookController(
    new ConfigureOrCreateCompanyWebhook()
  );
}
