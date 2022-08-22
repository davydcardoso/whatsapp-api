import { sign, verify } from "jsonwebtoken";

import application from "@/config/application";

import { Either, left, right } from "@/core/logic/Either";
import { InvalidCompanyTokenError } from "./errors/InvalidCompanyTokenError";

export type iToken = {
  companyId: string;
  companySecret: string;
};

export type iTokenPayload = {};

class Token {
  private readonly companyId: string;
  private readonly companySecret: string;
  public readonly token: string;

  private constructor({ companyId, companySecret }: iToken) {
    this.companyId = companyId;
    this.companySecret = companySecret;
  }

  static decode(
    token: string
  ): Either<InvalidCompanyTokenError, iTokenPayload> {
    try {
      const decoded = verify(token, application.secret) as iTokenPayload;

      return right(decoded);
    } catch (err) {
      return left(new InvalidCompanyTokenError());
    }
  }

  static register({ companyId, companySecret }: iToken): string {
    const token = sign({ companyId, companySecret }, application.secret, {
      subject: companyId,
      expiresIn: application.expiresIn,
    });

    return token;
  }
}

export { Token };
