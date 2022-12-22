import { randomUUID } from "crypto";

import { Either, left, right } from "@/core/logic/Either";

import { Companies } from "../../domain/companies";

import { Name } from "../../domain/name";
import { Email } from "../../domain/email";
import { Token } from "../../domain/token";
import { Documents } from "../../domain/document";

import { iCompaniesRepository } from "../../repositories/iCompaniesRepository";
import { EmailAlreadyRegisteredInTheSystemError } from "./errors/EmailAlreadyRegisteredInTheSystemError";
import { DocumentAlreadyRegisteredInTheSystemError } from "./errors/DocumentAlreadyRegisteredInTheSystemError";
import { InvalidCompanyDocumentError } from "../../domain/errors/InvalidCompanyDocumentError";
import { InvalidCompanyEmailError } from "../../domain/errors/InvalidCompanyEmailError";
import { InvalidCompanyTokenError } from "../../domain/errors/InvalidCompanyTokenError";
import { CompaniesMapper } from "../../mappers/CompaniesMapper";

type CreateNewCompanyRequest = {
  name: string;
  email: string;
  phones: string[];
  document: string;
};

type CreateNewCompanyResponse = Either<
  | EmailAlreadyRegisteredInTheSystemError
  | DocumentAlreadyRegisteredInTheSystemError
  | InvalidCompanyDocumentError
  | InvalidCompanyEmailError
  | InvalidCompanyTokenError,
  CreateNewCompanyResponseProps
>;

type CreateNewCompanyResponseProps = {};

class CreateNewCompany {
  constructor(private readonly companiesRepository: iCompaniesRepository) {}

  async perform({
    name,
    email,
    phones,
    document,
  }: CreateNewCompanyRequest): Promise<CreateNewCompanyResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const documentOrError = Documents.create(document);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (documentOrError.isLeft()) {
      return left(documentOrError.value);
    }

    if (!phones || phones.length <= 0) {
      return left(new Error("Phones number not found"));
    }

    const emailAlreadyExists = await this.companiesRepository.findByEmail(
      email
    );
    const documentAlreadyExists = await this.companiesRepository.findByDocument(
      document
    );

    if (emailAlreadyExists) {
      return left(new EmailAlreadyRegisteredInTheSystemError());
    }

    if (documentAlreadyExists) {
      return left(new DocumentAlreadyRegisteredInTheSystemError());
    }

    const regexPhone =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

    const phonesInvalid = phones.some((number) => regexPhone.test(number));

    if (!phonesInvalid) {
      return left(new Error("Phone number is not valid"));
    }

    const companyId = randomUUID();
    const companySecret = randomUUID();

    const tokenRegistred = Token.register({ companyId, companySecret });

    const companyOrError = Companies.create(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        document: documentOrError.value,
        actived: process.env.API_AMBIENT == "development" ? true : false,
        token: tokenRegistred,
        secret: companySecret,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      companyId
    );

    if (companyOrError.isLeft()) {
      return left(companyOrError.value);
    }

    const company = companyOrError.value;

    await this.companiesRepository.create(company);

    // for await (const phone of phones) {
    //   await this.companiesRepository.createSession(phone, company.id);
    // }

    return right({
      company: CompaniesMapper.toPersistence(company),
    });
  }
}

export { CreateNewCompany };
