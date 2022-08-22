import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { WhatsappQueueProvider } from "@/infra/providers/implementations/queues/WhatsappQueueProvider";
import { SendWhatsAppTextMessage } from "@/modules/whatsapp/useCases/SendWhatsAppTextMessage/SendWhatsAppTextMessage";
import { SendWhatsAppTextMessageController } from "@/modules/whatsapp/useCases/SendWhatsAppTextMessage/SendWhatsAppTextMessageController";
import { ContactsRepository } from "../../database/repositories/ContactRepository";

export function makeSendWhatsAppTextMessageController(): Controller {
  const contactRepository = new ContactsRepository(ConnectionPrisma);
  const whatsAppQueueProvider = new WhatsappQueueProvider();

  return new SendWhatsAppTextMessageController(
    new SendWhatsAppTextMessage(contactRepository, whatsAppQueueProvider)
  );
}
