import { Either, left, right } from "@/core/logic/Either";
import { Messages, MessageType } from "../../domain/messages";
import { iContactsRepository } from "../../repositories/iContactsRepository";
import { iMessagesRepository } from "../../repositories/iMessagesRepository";
import { ContactInformedHasNoMessagesError } from "./errors/ContactInformedHasNoMessagesError";
import { ContactIsNotExistsInSystemError } from "./errors/ContactIsNotExistsInSystemError";

type GetAllMessagesWhatsappRequest = {
  contactid?: string;
  companyid: string;
};

type GetAllMessagesWhatsappResponse = Either<
  Error,
  GetAllMessagesWhatsappResponseProps
>;

type GetAllMessagesWhatsappResponseProps = {
  messages: {
    companyId: string;
    contactId: string;
    type: string;
    read: boolean;
    body: string;
    createdAt?: Date;
    updatedAt: Date;
  }[];
};

class GetAllMessagesWhatsapp {
  constructor(
    private readonly messagesRepository: iMessagesRepository,
    private readonly contactRepository: iContactsRepository
  ) {}

  async perform({
    companyid,
    contactid,
  }: GetAllMessagesWhatsappRequest): Promise<GetAllMessagesWhatsappResponse> {
    let messages: Messages[] = [];

    messages = await this.messagesRepository.findByCompanyId(companyid);

    if (contactid) {
      const contact = await this.contactRepository.findById(contactid);

      if (!contact) {
        return left(new ContactIsNotExistsInSystemError());
      }

      messages = [];

      messages = await this.messagesRepository.findByContactId(contactid);

      if (!messages || messages.length == 0) {
        return left(new ContactInformedHasNoMessagesError());
      }
    }

    return right({
      messages: messages.map((message) => {
        return {
          companyId: message.companyId,
          contactId: message.contactId,
          type: MessageType[message.type],
          read: message.read,
          body: message.body,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      }),
    });
  }
}

export { GetAllMessagesWhatsapp };
