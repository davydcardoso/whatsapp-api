import { decode } from "jsonwebtoken";

import {
  fail,
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from "@/core/infra/HttpResponse";

import { Middleware } from "@/core/infra/Middleware";

import { AccessDeniedError } from "../errors/access-denied";

import { iCompaniesRepository } from "@/modules/companies/repositories/iCompaniesRepository";

type AuthenticatedMiddlewareRequest = {
  authorization: string;
};

type DecodedJwt = {
  companyId: string;
  companySecret: string;
  sub: string;
  exp: number;
};

class AuthenticationMiddleware implements Middleware {
  constructor(private readonly companiesRepository: iCompaniesRepository) {}

  async handle(
    httpRequest: AuthenticatedMiddlewareRequest,
    httpBody?: any
  ): Promise<false | HttpResponse> {
    try {
      const { authorization } = httpRequest;

      if (authorization) {
        const [, token] = authorization.split(" ");

        if (!token) {
          return unauthorized(
            new Error(
              "Token informado está invalido, favor verifique e tente novamente"
            )
          );
        }

        const company = await this.companiesRepository.findByToken(token);

        if (!company) {
          return unauthorized(new Error("Cadastro não localizado no sistema"));
        }

        if (!company.actived) {
          return unauthorized(
            new Error("A conta de sua empresa ainda não foi ativada")
          );
        }

        const decoded = decode(token) as DecodedJwt;

        return ok({
          companyId: decoded.companyId,
          companySecret: decoded.companySecret,
        });
      }

      return forbidden(new AccessDeniedError());
    } catch (err) {
      return fail(err);
    }
  }
}

export { AuthenticationMiddleware };
