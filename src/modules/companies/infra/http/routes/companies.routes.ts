import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { Router } from "express";
import { makeCreateNewCompanyController } from "../factories/CreateNewCompanyControllerFactory";

class CompaniesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.publicRoutes();
  }

  protected publicRoutes() {
    this.router.post("/", adaptRoute(makeCreateNewCompanyController()));
  }
}

export { CompaniesRoutes };
