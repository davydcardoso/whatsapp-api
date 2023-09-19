import { Router } from "express";

import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";

import { makeAuthenticatedMiddleware } from "@/infra/http/factories/middlewares/AuthenticatedMiddleware";

import { makeCreateNewCompanyController } from "../factories/CreateNewCompanyControllerFactory";
import { makeFetchCompanyTokenController } from "../factories/FetchCompanyTokenControllerFactory";
import { makeUpdateCompanyAccessTokenController } from "../factories/UpdateCompanyAccessTokenControllerFactory";
import { makeConfigureOrCreateCompanyWebhookController } from "../factories/ConfigureOrCreateCompanyWebhookControllerFactory";

class CompaniesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.publicRoutes();
    this.settingsRoutes();
  }

  protected publicRoutes() {
    this.router.post("/", adaptRoute(makeCreateNewCompanyController()));

    this.router.get("/token", adaptRoute(makeFetchCompanyTokenController()));

    this.router.put(
      "/token",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeUpdateCompanyAccessTokenController())
    );
  }

  protected settingsRoutes() {
    this.router.put(
      "/settings/webhook",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeConfigureOrCreateCompanyWebhookController())
    );
  }
}

export { CompaniesRoutes };
