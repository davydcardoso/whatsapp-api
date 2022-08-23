import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { GetWhatsappSession } from "@/modules/whatsapp/useCases/GetQrcodeSession/GetQrcodeSession";
import { GetWhatsappSessionController } from "@/modules/whatsapp/useCases/GetQrcodeSession/GetWhatsappSessionController";
import { SessionRepository } from "../../database/repositories/SessionRepository";

export function makeGetWhatsappSessionController(): Controller {
  const sessionsRepository = new SessionRepository(ConnectionPrisma);

  return new GetWhatsappSessionController(
    new GetWhatsappSession(sessionsRepository)
  );
}
