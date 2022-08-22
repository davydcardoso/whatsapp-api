import { Contacts as ContactPersistence } from "@prisma/client";
import { Contacts } from "../domain/contacts";

class ContactsMapper {
  static toPersistence(raw: Contacts): ContactPersistence {
    return {
      id: raw.id,
      name: raw.name,
      phone: raw.phone,
      photo: raw.photo,
      companyId: raw.companyId,
      whatsappId: raw.whatsappId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: ContactPersistence): Contacts {
    const contactsOrError = Contacts.create(
      {
        name: raw.name,
        phone: raw.phone,
        photo: raw.photo,
        companyId: raw.companyId,
        whatsappId: raw.whatsappId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );

    if (contactsOrError.isRight()) {
      return contactsOrError.value;
    }

    return null;
  }
}

export { ContactsMapper };
