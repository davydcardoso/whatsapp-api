import { Router } from "express";

import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";

import { makeAuthenticatedMiddleware } from "@/infra/http/factories/middlewares/AuthenticatedMiddleware";
import { makeGetQrcodeSessionController } from "../factories/GetQrcodeSessionControllerFactory";
import { makeGetAllMessagesWhatsappController } from "../factories/GetAllMessagesWhatsappControllerFactory";
import { makeStartNewWhatsappSessionController } from "../factories/StartNewWhatsappSessionControllerFactory";
import { makeSendWhatsAppTextMessageController } from "../factories/SendWhatsAppTextMessageControllerFactory";

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
      "/session/qrcode",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetQrcodeSessionController())
    );

    this.router.get(
      "/message/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetAllMessagesWhatsappController())
    );
  }
}

export { WhatsappRoutes };
