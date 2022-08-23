import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { GetAllMessagesWhatsapp } from "@/modules/whatsapp/useCases/GetAllMessagesWhatsapp/GetAllMessagesWhatsapp";
import { GetAllMessagesWhatsappController } from "@/modules/whatsapp/useCases/GetAllMessagesWhatsapp/GetAllMessagesWhatsappController";
import { ContactsRepository } from "../../database/repositories/ContactRepository";
import { MessagesRepository } from "../../database/repositories/MessagesRepository";

export function makeGetAllMessagesWhatsappController(): Controller {
  const messagesRepository = new MessagesRepository(ConnectionPrisma);
  const contactRepository = new ContactsRepository(ConnectionPrisma);

  return new GetAllMessagesWhatsappController(
    new GetAllMessagesWhatsapp(messagesRepository, contactRepository)
  );
}
