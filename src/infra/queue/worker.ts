import "@/config/bootstrap";

import { logger } from "@/utils/logger";

import { ConnectionPrisma } from "../databases/prisma/connection";

import { WhatsappProvider } from "../providers/implementations/queues/WhatsappProvider";

import { SessionRepository } from "@/modules/whatsapp/infra/database/repositories/SessionRepository";
import { ContactsRepository } from "@/modules/whatsapp/infra/database/repositories/ContactRepository";
import { MessagesRepository } from "@/modules/whatsapp/infra/database/repositories/MessagesRepository";

import { currentDateFormatted, currentTimeFormatted } from "@/utils/date-time";

const prismaConnection = ConnectionPrisma;

const sessionsRepository = new SessionRepository(prismaConnection);
const contactsRepository = new ContactsRepository(prismaConnection);
const messagesRepository = new MessagesRepository(prismaConnection);

const whatsappProvider = new WhatsappProvider(
  sessionsRepository,
  contactsRepository,
  messagesRepository
);

whatsappProvider.process(async ({ data }) => {
  await whatsappProvider.processor(data);
});

logger.info(
  `Gerenciador de filas iniciado | Data:${currentDateFormatted()} as ${currentTimeFormatted()}`
);
