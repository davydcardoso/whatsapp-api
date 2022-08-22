import { Either, left, right } from "@/core/logic/Either";
import { iWhatsappQueueProvider } from "@/infra/providers/contracts/iWhatsappQueueProvider";
import { TypeJobWhatsApp } from "../../jobs/iDeliverWhatsappJob";
import { iContactsRepository } from "../../repositories/iContactsRepository";
import { iMessagesRepository } from "../../repositories/iMessagesRepository";

type SendWhatsAppTextMessageRequest = {
  companyid: string;
  companySecret: string;
  recipient: {
    phone: string;
    contactId: string;
    message: {
      body: string;
    };
  };
};

type SendWhatsAppTextMessageResponse = Either<
  Error,
  SendWhatsAppTextMessageResponseProps
>;

type SendWhatsAppTextMessageResponseProps = {
  message: string;
  note: string[];
};

class SendWhatsAppTextMessage {
  constructor(
    private readonly contactRepository: iContactsRepository,
    private readonly whatsAppQueueProvider: iWhatsappQueueProvider
  ) {}

  async perform({
    companyid: companyId,
    companySecret,
    recipient,
  }: SendWhatsAppTextMessageRequest): Promise<SendWhatsAppTextMessageResponse> {
    let note: string[] = [];

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
      return left(new Error("Mensagem não informada"));
    }

    const contact = await this.contactRepository.findById(contactId);

    if (!contact) {
      note.push(
        "Contato informado não está salvo no sistema, sua mensagem sera enviada mas o telefone tem que estár 100% correto"
      );
    }

    await this.whatsAppQueueProvider.sendMessage({
      type: TypeJobWhatsApp.MESSAGE,
      sender: {
        companyId,
        companySecret,
      },
      recipient: {
        phone,
        contactId,
        contactLocated: !!contact,
        message: {
          isMedia: false,
          body: message.body,
        },
      },
    });

    return right({ message: "MESSAGE SENT SUCCESSFULLY", note });
  }
}

export { SendWhatsAppTextMessage };
