import multer from "multer";
import { Router } from "express";

import uploadConfig from "@/config/multer";

import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";

import { makeAuthenticatedMiddleware } from "@/infra/http/factories/middlewares/AuthenticatedMiddleware";
import { makeGetWhatsappSessionController } from "../factories/GetWhatsappSessionControllerFactory";
import { makeCloseWhatsAppSessionController } from "../factories/CloseWhatsAppSessionControllerFactory";
import { makeGetAllMessagesWhatsappController } from "../factories/GetAllMessagesWhatsappControllerFactory";
import { makeGetAllContactsWhatsAppController } from "../factories/GetAllContactsWhatsAppControllerFactory";
import { makeSendWhatsAppFileMessageController } from "../factories/SendWhatsAppFileMessageControllerFactory";
import { makeStartNewWhatsappSessionController } from "../factories/StartNewWhatsappSessionControllerFactory";
import { makeSendWhatsAppTextMessageController } from "../factories/SendWhatsAppTextMessageControllerFactory";

const upload = multer(uploadConfig);

class WhatsappRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.SessionsRoutes();
    this.MessagesRoutes();
    this.ContactsRoutes();
  }

  protected ContactsRoutes() {
    this.router.get(
      "/contacts",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetAllContactsWhatsAppController())
    );
  }

  protected MessagesRoutes() {
    this.router.get(
      "/message/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetAllMessagesWhatsappController())
    );

    this.router.post(
      "/message/text/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeSendWhatsAppTextMessageController())
    );

    this.router.post(
      "/message/file",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      upload.single("file"),
      adaptRoute(makeSendWhatsAppFileMessageController())
    );
  }

  protected SessionsRoutes() {
    this.router.post(
      "/session/start",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeStartNewWhatsappSessionController())
    );

    this.router.put(
      "/session/close",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeCloseWhatsAppSessionController())
    );

    this.router.get(
      "/session/",
      adaptMiddleware(makeAuthenticatedMiddleware()),
      adaptRoute(makeGetWhatsappSessionController())
    );
  }
}

export { WhatsappRoutes };
