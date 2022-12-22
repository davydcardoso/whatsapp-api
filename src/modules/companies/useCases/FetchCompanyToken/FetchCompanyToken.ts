import { Either, left, right } from "@/core/logic/Either";
import { iCompaniesRepository } from "../../repositories/iCompaniesRepository";
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError";
import { CompanySecretKeyIsInvalidError } from "./errors/CompanySecretKeyIsInvalidError";

type FetchCompanyTokenRequest = {
  authorization: string;
};

type FetchCompanyTokenResponse = Either<Error, FetchCompanyTokenResponseProps>;

type FetchCompanyTokenResponseProps = {
  token: string;
};

export class FetchCompanyToken {
  constructor(private readonly companiesRepository: iCompaniesRepository) {}

  async perform({
    authorization,
  }: FetchCompanyTokenRequest): Promise<FetchCompanyTokenResponse> {
    const [, token] = authorization.split(" ");
    const [companyId, companySecret] = Buffer.from(token, "base64")
      .toString("ascii")
      .split(":");

    if (!companyId || !companySecret) {
      return left(new Error("Token informado está invalido"));
    }

    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      return left(new CompanyNotFoundError());
    }

    if (company.secret !== companySecret) {
      return left(new CompanySecretKeyIsInvalidError());
    }

    return right({
      token: company.token,
    });
  }
}
