import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetAllMessagesWhatsapp } from "./GetAllMessagesWhatsapp";

type GetAllMessagesWhatsappControllerRequest = {
  contactid?: string;
  companyid: string;
};

class GetAllMessagesWhatsappController implements Controller {
  constructor(
    private readonly getAllMessagesWhatsapp: GetAllMessagesWhatsapp
  ) {}

  async handle(
    request: GetAllMessagesWhatsappControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid, contactid } = request;

      const result = await this.getAllMessagesWhatsapp.perform({
        companyid,
        contactid,
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

export { GetAllMessagesWhatsappController };
