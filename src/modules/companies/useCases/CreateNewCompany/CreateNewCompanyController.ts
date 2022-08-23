import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, created } from "@/core/infra/HttpResponse";
import { CreateNewCompany } from "./CreateNewCompany";

type CreateNewCompanyControllerRequest = {
  name: string;
  email: string;
  phones: string[];
  document: string;
};

class CreateNewCompanyController implements Controller {
  constructor(private readonly createNewCompany: CreateNewCompany) {}

  async handle(
    request: CreateNewCompanyControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { name, email, phones, document } = request;

      const result = await this.createNewCompany.perform({
        name,
        email,
        phones,
        document,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}

export { CreateNewCompanyController };
