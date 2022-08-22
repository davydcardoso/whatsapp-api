import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

import { Name } from "./name";
import { Email } from "./email";
import { Documents } from "./document";

import { InvalidCompanyNameError } from "./errors/InvalidCompanyNameError";
import { InvalidCompanyEmailError } from "./errors/InvalidCompanyEmailError";
import { InvalidCompanyDocumentError } from "./errors/InvalidCompanyDocumentError";
import { Token } from "./token";

type CompaniesProps = {
  name: Name;
  email: Email;
  token: string;
  secret: string;
  actived: boolean;
  document: Documents;
  createdAt?: Date;
  updatedAt: Date;
};

class Companies extends Entity<CompaniesProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get actived() {
    return this.props.actived;
  }

  get document() {
    return this.props.document;
  }

  get token() {
    return this.props.token;
  }

  get secret() {
    return this.props.secret;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: CompaniesProps, id?: string) {
    super(props, id);
  }

  static create(
    props: CompaniesProps,
    id?: string
  ): Either<
    | InvalidCompanyNameError
    | InvalidCompanyEmailError
    | InvalidCompanyDocumentError,
    Companies
  > {
    const companies = new Companies(props, id);

    return right(companies);
  }
}

export { Companies };
