import {
  Messages as MessagesPersistence,
  MessageType as MessageTypePersistence,
} from "@prisma/client";
import { Messages, MessageType } from "../domain/messages";

class MessagesMapper {
  static toPersistence(raw: Messages): MessagesPersistence {
    return {
      id: raw.id,
      body: raw.body,
      read: raw.read,
      type: MessageTypePersistence[MessageType[raw.type]],
      companyId: raw.companyId,
      contactId: raw.contactId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: MessagesPersistence): Messages {
    const messagesOrError = Messages.create(
      {
        body: raw.body,
        read: raw.read,
        type: MessageType[MessageTypePersistence[raw.type]],
        companyId: raw.companyId,
        contactId: raw.contactId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );

    if (messagesOrError.isRight()) {
      return messagesOrError.value;
    }

    return null;
  }
}

export { MessagesMapper };
