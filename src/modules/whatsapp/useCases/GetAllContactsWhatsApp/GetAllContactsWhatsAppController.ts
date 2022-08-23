import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetAllContactsWhatsApp } from "./GetAllContactsWhatsApp";

type GetAllContactsWhatsAppControllerRequest = {
  companyid: string;
};

class GetAllContactsWhatsAppController implements Controller {
  constructor(
    private readonly getAllContactsWhatsApp: GetAllContactsWhatsApp
  ) {}

  async handle(
    request: GetAllContactsWhatsAppControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid } = request;

      const result = await this.getAllContactsWhatsApp.perform({ companyid });

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

export { GetAllContactsWhatsAppController };
