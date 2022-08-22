import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeAuthenticatedMiddleware } from "@/infra/http/factories/middlewares/AuthenticatedMiddleware";
import { Router } from "express";
import { makeSendWhatsAppTextMessageController } from "../factories/SendWhatsAppTextMessageControllerFactory";
import { makeStartNewWhatsappSessionController } from "../factories/StartNewWhatsappSessionControllerFactory";

class WhatsappRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.publicRoutes();
  }

  protected publicRoutes() {
    this.router.post(
      "/session/start",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeStartNewWhatsappSessionController())
    );
    this.router.post(
      "/message/text/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeSendWhatsAppTextMessageController())
    );
  }
}

export { WhatsappRoutes };
