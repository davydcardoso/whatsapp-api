import { Controller } from "@/core/infra/Controller";
import { ConnectionPrisma } from "@/infra/databases/prisma/connection";
import { GetAllContactsWhatsApp } from "@/modules/whatsapp/useCases/GetAllContactsWhatsApp/GetAllContactsWhatsApp";
import { GetAllContactsWhatsAppController } from "@/modules/whatsapp/useCases/GetAllContactsWhatsApp/GetAllContactsWhatsAppController";
import { ContactsRepository } from "../../database/repositories/ContactRepository";

export function makeGetAllContactsWhatsAppController(): Controller {
  const contactsRepository = new ContactsRepository(ConnectionPrisma);

  return new GetAllContactsWhatsAppController(
    new GetAllContactsWhatsApp(contactsRepository)
  );
}
