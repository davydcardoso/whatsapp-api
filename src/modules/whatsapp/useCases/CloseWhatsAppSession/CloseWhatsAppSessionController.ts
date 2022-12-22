import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { CloseWhatsAppSession } from "./CloseWhatsAppSession";

type CloseWhatsAppSessionControllerRequest = {
  companyId: string;
};

export class CloseWhatsAppSessionController implements Controller {
  constructor(private readonly closeWhatsAppSession: CloseWhatsAppSession) {}

  async handle(
    request: CloseWhatsAppSessionControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyId } = request;

      const result = await this.closeWhatsAppSession.perform({ companyId });

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
