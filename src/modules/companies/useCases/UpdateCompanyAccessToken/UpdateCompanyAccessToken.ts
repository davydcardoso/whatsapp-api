import { Either, left, right } from "@/core/logic/Either";
import { iCompaniesRepository } from "../../repositories/iCompaniesRepository";
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError";
import { Companies } from "../../domain/companies";
import { Name } from "../../domain/name";
import { Email } from "../../domain/email";
import { Documents } from "../../domain/document";
import { Token } from "../../domain/token";
import { CompaniesMapper } from "../../mappers/CompaniesMapper";

type UpdateCompanyAccessTokenRequest = {
  companyId: string;
};

type UpdateCompanyAccessTokenResponse = Either<
  Error,
  UpdateCompanyAccessTokenResponseProps
>;

type UpdateCompanyAccessTokenResponseProps = {};

export class UpdateCompanyAccessToken {
  constructor(private readonly companiesRepository: iCompaniesRepository) {}

  async perform({
    companyId,
  }: UpdateCompanyAccessTokenRequest): Promise<UpdateCompanyAccessTokenResponse> {
    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      return left(new CompanyNotFoundError());
    }

    const newToken = Token.register({
      companyId: company.id,
      companySecret: company.secret,
    });

    const companyOrError = Companies.create(
      {
        name: company.name,
        email: company.email,
        document: company.document,
        actived: false,
        secret: company.secret,
        token: newToken,
        createdAt: company.createdAt,
        updatedAt: new Date(),
      },
      company.id
    );

    if (companyOrError.isLeft()) {
      return left(companyOrError.value);
    }

    await this.companiesRepository.update(companyOrError.value);

    return right({
      company: CompaniesMapper.toPersistence(companyOrError.value),
    });
  }
}
