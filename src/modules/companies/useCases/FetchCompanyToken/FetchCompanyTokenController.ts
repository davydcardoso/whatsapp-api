import { Controller } from "@/core/infra/Controller";
import { HttpResponse, clientError, fail, ok } from "@/core/infra/HttpResponse";
import { FetchCompanyToken } from "./FetchCompanyToken";

type FetchCompanyTokenControllerRequest = {
  authorization: string;
};

export class FetchCompanyTokenController implements Controller {
  constructor(private readonly fetchCompanyToken: FetchCompanyToken) {}

  async handle(
    request: FetchCompanyTokenControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { authorization } = request;

      const result = await this.fetchCompanyToken.perform({ authorization });

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
