import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { CompaniesRepository } from "@/modules/companies/infra/databases/repositories/CompaniesRepository";
import { CloseWhatsAppSession } from "@/modules/whatsapp/useCases/CloseWhatsAppSession/CloseWhatsAppSession";
import { CloseWhatsAppSessionController } from "@/modules/whatsapp/useCases/CloseWhatsAppSession/CloseWhatsAppSessionController";
import { SessionRepository } from "../../database/repositories/SessionRepository";
import { WhatsappQueueProvider } from "@/infra/providers/implementations/queues/WhatsappQueueProvider";

export function makeCloseWhatsAppSessionController(): Controller {
  const prismaConnection = ConnectionPrisma;

  const sessionRepository = new SessionRepository(prismaConnection);
  const companiesRepository = new CompaniesRepository(prismaConnection);
  const whatsappQueueProvider = new WhatsappQueueProvider();

  return new CloseWhatsAppSessionController(
    new CloseWhatsAppSession(
      sessionRepository,
      companiesRepository,
      whatsappQueueProvider
    )
  );
}
