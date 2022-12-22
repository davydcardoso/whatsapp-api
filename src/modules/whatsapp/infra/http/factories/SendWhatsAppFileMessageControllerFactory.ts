import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { WhatsappQueueProvider } from "@/infra/providers/implementations/queues/WhatsappQueueProvider";
import { SendWhatsAppFileMessage } from "@/modules/whatsapp/useCases/SendWhatsAppFileMessage/SendWhatsAppFileMessage";
import { SendWhatsAppFileMessageController } from "@/modules/whatsapp/useCases/SendWhatsAppFileMessage/SendWhatsAppFileMessageController";
import { ContactsRepository } from "../../database/repositories/ContactRepository";
import { MediaMessagesRepository } from "../../database/repositories/MediaMessagesRepository";
import { MessagesRepository } from "../../database/repositories/MessagesRepository";

export function makeSendWhatsAppFileMessageController(): Controller {
  const prismaConnection = ConnectionPrisma;

  const contactRepository = new ContactsRepository(prismaConnection);
  const messagesRepository = new MessagesRepository(prismaConnection);
  const whatsAppQueueProvider = new WhatsappQueueProvider();
  const mediaMessagesRepository = new MediaMessagesRepository(prismaConnection);

  return new SendWhatsAppFileMessageController(
    new SendWhatsAppFileMessage(
      contactRepository,
      messagesRepository,
      whatsAppQueueProvider,
      mediaMessagesRepository
    )
  );
}
