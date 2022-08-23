import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetWhatsappSession } from "./GetQrcodeSession";

type GetQrcodeSessionControllerRequest = {
  companyid: string;
  companySecret: string;
};

class GetWhatsappSessionController implements Controller {
  constructor(private readonly getQrcodeSession: GetWhatsappSession) {}

  async handle(
    request: GetQrcodeSessionControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid, companySecret } = request;

      const result = await this.getQrcodeSession.perform({
        companyid,
        companySecret,
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

export { GetWhatsappSessionController };
