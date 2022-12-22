import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { WhatsappQueueProvider } from "@/infra/providers/implementations/queues/WhatsappQueueProvider";
import { CompaniesRepository } from "@/modules/companies/infra/databases/repositories/CompaniesRepository";

import { StartNewWhatsappSession } from "@/modules/whatsapp/useCases/StartNewWhatsappSession/StartNewWhatsappSession";
import { StartNewWhatsappSessionController } from "@/modules/whatsapp/useCases/StartNewWhatsappSession/StartNewWhatsappSessionController";
import { SessionRepository } from "../../database/repositories/SessionRepository";

export function makeStartNewWhatsappSessionController(): Controller {
  const prismaConnection = ConnectionPrisma;

  const companiesRepository = new CompaniesRepository(prismaConnection);
  const sessionRepository = new SessionRepository(prismaConnection);
  const whatsappQueueProvider = new WhatsappQueueProvider();

  return new StartNewWhatsappSessionController(
    new StartNewWhatsappSession(
      companiesRepository,
      whatsappQueueProvider,
      sessionRepository
    )
  );
}
