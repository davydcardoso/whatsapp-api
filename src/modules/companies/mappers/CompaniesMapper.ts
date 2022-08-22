import { Companies as CompaniesPersistence } from "@prisma/client";

import { Companies } from "../domain/companies";

import { Name } from "../domain/name";
import { Email } from "../domain/email";
import { Documents } from "../domain/document";
import { Token } from "../domain/token";

class CompaniesMapper {
  static toPersistence(raw: Companies): CompaniesPersistence {
    return {
      id: raw.id,
      name: raw.name.value,
      email: raw.email.value,
      document: raw.document.value,
      activated: raw.actived,
      token: raw.token,
      secret: raw.secret,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: CompaniesPersistence): Companies {
    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);
    const documentOrError = Documents.create(raw.document);

    if (nameOrError.isLeft()) {
      throw nameOrError.value;
    }

    if (emailOrError.isLeft()) {
      throw emailOrError.value;
    }

    if (documentOrError.isLeft()) {
      throw documentOrError.value;
    }

    const companyOrError = Companies.create(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        document: documentOrError.value,
        token: raw.token,
        secret: raw.secret,
        actived: raw.activated,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );

    if (companyOrError.isRight()) {
      return companyOrError.value;
    }

    return null;
  }
}

export { CompaniesMapper };
