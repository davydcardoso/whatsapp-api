import { Controller } from "@/core/infra/Controller";
import { HttpResponse, clientError, fail, ok } from "@/core/infra/HttpResponse";
import { ConfigureOrCreateCompanyWebhook } from "./ConfigureOrCreateCompanyWebhook";

type ConfigureOrCreateCompanyWebhookControllerRequest = {
  companyId: string;
  webhook: string;
};

export class ConfigureOrCreateCompanyWebhookController implements Controller {
  constructor(
    private readonly configureOrCreateCompanyWebhook: ConfigureOrCreateCompanyWebhook
  ) {}

  async handle(
    request: ConfigureOrCreateCompanyWebhookControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyId, webhook } = request;

      const result = await this.configureOrCreateCompanyWebhook.perform({
        companyId,
        webhook,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
