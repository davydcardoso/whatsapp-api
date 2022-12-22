import { randomUUID } from "crypto";

import { Either, left, right } from "@/core/logic/Either";

import { TypeJobWhatsApp } from "../../jobs/iDeliverWhatsappJob";

import { iMessagesRepository } from "../../repositories/iMessagesRepository";
import { iContactsRepository } from "../../repositories/iContactsRepository";
import { iWhatsappQueueProvider } from "@/infra/providers/contracts/iWhatsappQueueProvider";
import { iMediaMessagesRepository } from "../../repositories/iMediaMessagesRepository";

import { MediaMessage } from "../../domain/mediaMessages";
import { Messages, MessageType } from "../../domain/messages";

import { publicFolder } from "@/config/multer";
import { currentDateFormatted, currentTimeFormatted } from "@/utils/date-time";

type SendWhatsAppFileMessageRequest = {
  companyId: string;
  originalname: string;
  mimetype: string;
  filename: string;
  destination: string;
  path: string;
  size: string;
  content: {
    recipient: {
      phone: string;
      contactId: string;
      message: {
        body: string;
      };
    };
  };
};

type SendWhatsAppFileMessageResponse = Either<
  Error,
  SendWhatsAppFileMessageResponseProps
>;

type SendWhatsAppFileMessageResponseProps = {
  message: string;
  note: string[];
};

export class SendWhatsAppFileMessage {
  constructor(
    private readonly contactRepository: iContactsRepository,
    private readonly messagesRepository: iMessagesRepository,
    private readonly whatsAppQueueProvider: iWhatsappQueueProvider,
    private readonly mediaMessagesRepository: iMediaMessagesRepository
  ) {}

  async perform({
    size,
    path,
    content,
    mimetype,
    filename,
    companyId,
    destination,
    originalname,
  }: SendWhatsAppFileMessageRequest): Promise<SendWhatsAppFileMessageResponse> {
    let note: string[] = [];

    const { recipient } = content;

    if (!recipient) {
      return left(
        new Error(`Por favor informe os dados do recebedor (recipient)`)
      );
    }

    const { phone, contactId, message } = recipient;

    if (!phone || phone.trim().length < 5 || phone.trim().length > 255) {
      return left(new Error("Numero de telefone não é valido"));
    }

    const regexPhone =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

    if (!regexPhone.test(phone)) {
      return left(new Error("Numero de telefone não é valido"));
    }

    if (
      !contactId ||
      contactId.trim().length < 5 ||
      contactId.trim().length > 255
    ) {
      return left(new Error("Id do contato não informado ou invalido"));
    }

    if (!message || message.body.trim().length < 1) {
      note.push(
        "Sua mensagem está sem nenhum texto, mas será enviada normalmente"
      );
    }

    const contact = await this.contactRepository.findById(contactId);

    if (!contact) {
      note.push(
        "Contato informado não está salvo no sistema, sua mensagem sera enviada mas o telefone tem que estár 100% correto"
      );
    }

    const messageId: string = randomUUID();
    const mediaMessageId: string = randomUUID();

    try {
      const messageOrError = Messages.create(
        {
          companyId,
          contactId: contact ? contact.whatsappId : `${phone}@c.us`,
          body: message.body,
          read: false,
          type: MessageType.SENT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        messageId
      );

      if (messageOrError.isLeft()) {
        return left(messageOrError.value);
      }

      const messageDomain = messageOrError.value;

      await this.messagesRepository.create(messageDomain);

      const mediaMessageOrError = MediaMessage.create(
        {
          companyId,
          mimetype,
          messageId,
          destination,
          fileName: filename,
          originalName: originalname,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        mediaMessageId
      );

      if (mediaMessageOrError.isLeft()) {
        await this.messagesRepository.delete(messageId);

        return left(mediaMessageOrError.value);
      }

      const mediaMessage = mediaMessageOrError.value;

      await this.mediaMessagesRepository.create(mediaMessage);

      await this.whatsAppQueueProvider.sendMessage({
        type: TypeJobWhatsApp.MEDIA_MESSAGE,
        sender: {
          companyId,
          companySecret: null,
        },
        recipient: {
          phone,
          contactId,
          contactLocated: !!contact,
          message: {
            isMedia: false,
            midiaFile: {
              messageId,
              mediaMessageId,
              filePath: path,
              fileName: filename,
              mediaType: mimetype,
            },
            body: message.body || undefined,
          },
        },
      });
    } catch (err) {
      return left(err);
    }

    return right({ message: "MEDIA MESSAGE SENT SUCCESSFULLY", note });
  }
}
