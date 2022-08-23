import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { GetQrcodeSession } from "./GetQrcodeSession";

type GetQrcodeSessionControllerRequest = {
  companyid: string;
  companySecret: string;
};

class GetQrcodeSessionController implements Controller {
  constructor(private readonly getQrcodeSession: GetQrcodeSession) {}

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

export { GetQrcodeSessionController };
