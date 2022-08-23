import { Router } from "express";

import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";

import { makeAuthenticatedMiddleware } from "@/infra/http/factories/middlewares/AuthenticatedMiddleware";
import { makeGetWhatsappSessionController } from "../factories/GetWhatsappSessionControllerFactory";
import { makeGetAllMessagesWhatsappController } from "../factories/GetAllMessagesWhatsappControllerFactory";
import { makeStartNewWhatsappSessionController } from "../factories/StartNewWhatsappSessionControllerFactory";
import { makeSendWhatsAppTextMessageController } from "../factories/SendWhatsAppTextMessageControllerFactory";
import { makeGetAllContactsWhatsAppController } from "../factories/GetAllContactsWhatsAppControllerFactory";

class WhatsappRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.AuthRoutes();
  }

  protected AuthRoutes() {
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

    this.router.get(
      "/session/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetWhatsappSessionController())
    );

    this.router.get(
      "/message/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetAllMessagesWhatsappController())
    );

    this.router.get(
      "/contacts",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetAllContactsWhatsAppController())
    );
  }
}

export { WhatsappRoutes };
