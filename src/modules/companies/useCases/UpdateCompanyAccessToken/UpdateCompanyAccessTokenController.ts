import { Controller } from "@/core/infra/Controller";
import { HttpResponse, clientError, fail, ok } from "@/core/infra/HttpResponse";
import { UpdateCompanyAccessToken } from "./UpdateCompanyAccessToken";

type UpdateCompanyAccessTokenControllerRequest = {
  companyid: string;
};

export class UpdateCompanyAccessTokenController implements Controller {
  constructor(
    private readonly updateCompanyAccessToken: UpdateCompanyAccessToken
  ) {}

  async handle(
    request: UpdateCompanyAccessTokenControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid } = request;

      const result = await this.updateCompanyAccessToken.perform({
        companyId: companyid,
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
