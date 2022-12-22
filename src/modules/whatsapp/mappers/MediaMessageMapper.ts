import { MediaMessages } from "@prisma/client";

import { MediaMessage } from "../domain/mediaMessages";

export class MediaMessageMapper {
  static toDomain(raw: MediaMessages): MediaMessage {
    const mediaMessageOrError = MediaMessage.create(
      {
        companyId: raw.companyId,
        messageId: raw.messageId,
        fileName: raw.fileName,
        mimetype: raw.mimetype,
        destination: raw.destination,
        originalName: raw.originalName,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );

    if (mediaMessageOrError.isLeft()) {
      return null;
    }

    return mediaMessageOrError.value;
  }

  static toPersistence(raw: MediaMessage): MediaMessages {
    return {
      id: raw.id,
      companyId: raw.companyId,
      messageId: raw.messageId,
      fileName: raw.fileName,
      mimetype: raw.mimetype,
      destination: raw.destination,
      originalName: raw.originalName,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
