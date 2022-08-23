import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { GetQrcodeSession } from "@/modules/whatsapp/useCases/GetQrcodeSession/GetQrcodeSession";
import { GetQrcodeSessionController } from "@/modules/whatsapp/useCases/GetQrcodeSession/GetQrcodeSessionController";
import { SessionRepository } from "../../database/repositories/SessionRepository";

export function makeGetQrcodeSessionController(): Controller {
  const sessionsRepository = new SessionRepository(ConnectionPrisma);

  return new GetQrcodeSessionController(
    new GetQrcodeSession(sessionsRepository)
  );
}
