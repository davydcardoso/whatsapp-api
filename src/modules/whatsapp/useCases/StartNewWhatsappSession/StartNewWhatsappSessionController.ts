import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { StartNewWhatsappSession } from "./StartNewWhatsappSession";

type StartNewWhatsappSessionControllerRequest = {
  companyid: string;
  companySecret: string;
};

class StartNewWhatsappSessionController implements Controller {
  constructor(
    private readonly startNewWhatsappSession: StartNewWhatsappSession
  ) {}

  async handle(
    request: StartNewWhatsappSessionControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid, companySecret } = request;

      const result = await this.startNewWhatsappSession.perform({
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

export { StartNewWhatsappSessionController };
