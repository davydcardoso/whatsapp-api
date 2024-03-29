import fs from "fs";
import qrcode from "qrcode-terminal";
import { Processor, QueueScheduler, Worker } from "bullmq";
import {
  Client as WhatsappClient,
  LocalAuth,
  MessageMedia,
} from "whatsapp-web.js";

import { RedisConnection } from "@/infra/redis/connection";
import { currentDateFormatted, currentTimeFormatted } from "@/utils/date-time";

import { Sessions } from "@/modules/whatsapp/domain/sessions";
import { Contacts } from "@/modules/whatsapp/domain/contacts";
import {
  iDeliverWhatsappJob,
  TypeJobWhatsApp,
} from "@/modules/whatsapp/jobs/iDeliverWhatsappJob";

import { iWhatsappProvider } from "../../contracts/iWhatsappProvider";
import { iSessionRepository } from "@/modules/whatsapp/repositories/iSessionRepository";
import { iContactsRepository } from "@/modules/whatsapp/repositories/iContactsRepository";
import { Messages, MessageType } from "@/modules/whatsapp/domain/messages";
import { iMessagesRepository } from "@/modules/whatsapp/repositories/iMessagesRepository";

import { publicFolder } from "@/config/multer";

interface WhatsappSessions extends WhatsappClient {
  companyId?: string;
  companySecret?: string;
}

type StartNewSessionProps = {
  companyId: string;
  companySecret: string;
};

type SessionProps = {
  companyId: string;
  companySecret: string;
};

class WhatsappProvider implements iWhatsappProvider {
  private whatsapp: WhatsappSessions[] = [];

  constructor(
    private readonly sessionsRepository: iSessionRepository,
    private readonly contactsRepository: iContactsRepository,
    private readonly messagesRepository: iMessagesRepository
  ) {
    this.sessionsRepository.disableAll();
  }

  public async processor({ type, sender, recipient }: iDeliverWhatsappJob) {
    console.log(
      `Processando nova tarefa | Tipo: ${TypeJobWhatsApp[type]} | Empresa ID: ${sender.companyId}`
    );

    switch (TypeJobWhatsApp[type]) {
      case "SESSION":
        this.startNewSession(sender);
        return;
      case "CLOSE_SESSION":
        this.closeWhatsAppSession(sender);
        return;
      case "MESSAGE":
        await this.sendMessage({ type, sender, recipient });
        return;
      case "MEDIA_MESSAGE":
        await this.sendMediaMessage({ type, sender, recipient });
        return;
      default:
        console.log(
          `Metodo não disponivel no sistema | Company Id: ${
            sender.companyId
          } | Data ${currentDateFormatted()} as ${currentTimeFormatted()}`
        );
        return;
    }
  }

  protected async closeWhatsAppSession({ companyId }: SessionProps) {
    console.log(
      `Sessões registradas no sistema: ${
        this.whatsapp.length || 0
      } | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
    );

    try {
      const session = this.whatsapp.find((wts) => wts.companyId === companyId);

      console.log(
        `Encerrando sessão | Company ID ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      await session.logout();

      console.log(
        `Sessão encerrada com sucesso| Company ID ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );
    } catch (err) {
      console.log(
        `Houve um erro ao fechar sessão do Whatsapp| Company ID ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
          err.message
        }`
      );
    }
  }

  protected async sendMediaMessage({
    sender,
    recipient,
  }: iDeliverWhatsappJob): Promise<void> {
    const { companyId } = sender;
    const { contactId, phone, message, contactLocated } = recipient;

    console.log(
      `Sessões registradas no sistema: ${
        this.whatsapp.length || 0
      } | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
    );

    try {
      const session = this.whatsapp.find((wts) => wts.companyId === companyId);

      if (!session) {
        console.log(
          `Não é possivel enviar mensagem, empresa seleciona não possui sessão ativa | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
        );
        return;
      }

      let contact: Contacts;

      if (contactLocated) {
        contact = await this.contactsRepository.findById(contactId);
      }

      const { body, midiaFile } = message;

      if (!midiaFile) {
        console.log(
          `Nenhum midia foi informada para o envio da mensagem | Company ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
        );

        return;
      }

      console.log(
        `Enviando arquivo para ${
          contact.name
        } | Company Id: ${companyId} | Data ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      const file = MessageMedia.fromFilePath(
        `${publicFolder}/${midiaFile.fileName}`
      );

      await session.sendMessage(
        contactLocated ? contact.whatsappId : `${phone}@c.us`,
        file,
        { caption: body }
      );

      if (process.env.DELETE_FILES_AFTER_UPLOAD) {
        fs.unlink(`${publicFolder}/${midiaFile.fileName}`, (err) => {
          if (err) {
            console.log(
              `Houve um erro ao excluir arquivo da pasta temporária | Company Id: ${companyId} | Data: ${currentDateFormatted()}  as ${currentTimeFormatted()}`
            );

            return;
          }

          console.log(
            `Arquivo temporário excluido com sucesso | Company Id: ${companyId} | Data: ${currentDateFormatted()}  as ${currentTimeFormatted()}`
          );
        });
      }

      console.log(
        `Arquivo enviado com sucesso para ${
          contact.name
        } | Company Id: ${companyId} | Data ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );
    } catch (err) {
      console.log(
        `Erro ao enviar mensagem por WhatsApp | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
          err.message
        }`
      );
    }
  }

  protected async sendMessage({
    sender,
    recipient,
  }: iDeliverWhatsappJob): Promise<void> {
    const { companyId } = sender;
    const { contactId, phone, message, contactLocated } = recipient;

    console.log(
      `Sessões registradas no sistema: ${
        this.whatsapp.length || 0
      } | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
    );

    try {
      const session = this.whatsapp.find((wts) => wts.companyId === companyId);

      if (!session) {
        console.log(
          `Não é possivel enviar mensagem, empresa seleciona não possui sessão ativa | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
        );
        return;
      }

      let contact: Contacts;

      if (contactLocated) {
        contact = await this.contactsRepository.findById(contactId);
      }

      console.log(
        `Enviando mensagem de texto para ${
          contact.name
        } | Company Id: ${companyId} | Data ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      await session.sendMessage(
        contactLocated ? contact.whatsappId : `${phone}@c.us`,
        message.body
      );

      const messageOrError = Messages.create({
        companyId,
        contactId: contactLocated ? contact.id : `${phone}@c.us`,
        body: message.body,
        read: false,
        type: MessageType.SENT,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (messageOrError.isLeft()) {
        console.log(
          `Erro ao salvar mensagem no banco de dados | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
            messageOrError.value.message
          }`
        );
        return;
      }

      const newmessage = messageOrError.value;

      await this.messagesRepository.create(newmessage);
      return;
    } catch (err) {
      console.log(
        `Erro ao enviar mensagem por WhatsApp | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
          err.message
        }`
      );
    }
  }

  protected async startNewSession({
    companyId,
    companySecret,
  }: StartNewSessionProps) {
    let session: Sessions = null;

    console.log(
      `Sessões registradas no sistema: ${
        this.whatsapp.length || 0
      } | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
    );

    console.log(
      `Inicializando sessão WhatsApp | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
    );

    const whatsapp: WhatsappSessions = new WhatsappClient({
      authStrategy: new LocalAuth({ clientId: companyId }),
      // puppeteer: {
      //   args: process.env.NO_GUI_SYSTEMS ? ["--no-sandbox"] : undefined,
      // },
    });

    session = await this.sessionsRepository.findByCompanyId(companyId);

    whatsapp.on("qr", async (qrc) => {
      console.log(
        `Gerando novo qrcode | Empresa ID: ${companyId} | Data Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      if (!session) {
        const newSession = Sessions.create({
          actived: false,
          authenticated: false,
          companyId,
          companySecret,
          qrcode: qrc,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (newSession.isRight()) {
          session = newSession.value;
        }
      }

      session.actived = false;
      session.authenticated = false;
      session.updatedAt = new Date();
      session.qrcode = qrc;

      await this.sessionsRepository.createOrUpdate(session);

      if (process.env.SHOW_QRCODE_IN_TERMINAL) {
        qrcode.generate(qrc, { small: true });
      }
    });

    whatsapp.on("authenticated", async (authSession) => {
      if (!session) {
        console.log(
          `Sessão restaurada por Token: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} `
        );
        return;
      }

      if (!session) {
        const newSession = Sessions.create({
          actived: true,
          authenticated: true,
          companyId,
          companySecret,
          qrcode: "SEM-QRCODE",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (newSession.isRight()) {
          session = newSession.value;
        }
      }

      session.actived = true;
      session.authenticated = true;
      session.updatedAt = new Date();
      // session.qrcode = qrc;

      await this.sessionsRepository.createOrUpdate(session);
    });

    whatsapp.on("message", async (message) => {
      let contactId: string;
      const contact = await message.getContact();

      console.log(
        `Mensagem recebida de: ${
          contact.pushname
        } Em ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      const contactAlreadyExists =
        await this.contactsRepository.findByWhatsappId(contact.id._serialized);

      if (!contactAlreadyExists || contactAlreadyExists === null) {
        const contactOrError = Contacts.create({
          name: contact.pushname || contact.shortName || "SEM NOME",
          phone: contact.id.user,
          photo: (await contact.getProfilePicUrl()) || "USUARIO_SEM_FOTO",
          companyId: companyId,
          whatsappId: contact.id._serialized,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (contactOrError.isLeft()) {
          console.log(
            `Erro ao preencher dados do novo contato | Empresa ID:${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
              contactOrError.value.message
            }`
          );
          return;
        }

        const newContact = contactOrError.value;

        contactId = newContact.id;

        await this.contactsRepository.create(newContact);
      }

      if (contactAlreadyExists) {
        contactId = contactAlreadyExists.id;
      }

      const messageOrError = Messages.create({
        companyId,
        contactId,
        body: message.body,
        read: false,
        type: MessageType.RECEIVED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (messageOrError.isLeft()) {
        console.log(
          `Erro ao salvar mensagem no banco de dados | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
            messageOrError.value.message
          }`
        );
        return;
      }

      const newmessage = messageOrError.value;

      await this.messagesRepository.create(newmessage);
      return;
    });

    whatsapp.on("ready", async () => {
      const contacts = await whatsapp.getContacts();

      if (!this.whatsapp || this.whatsapp.length === 0) {
        whatsapp.companyId = companyId;
        whatsapp.companySecret = companySecret;
        this.whatsapp.push(whatsapp);
      } else {
        const sessionIndex = this.whatsapp.findIndex(
          (wts) => wts.companyId == companyId
        );

        if (sessionIndex === -1) {
          whatsapp.companyId = companyId;
          whatsapp.companySecret = companySecret;
          this.whatsapp.push(whatsapp);
        }
      }

      console.log(
        `Sessão WhatsApp iniciada com sucesso | Empresa ID: ${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()}`
      );

      for await (const contact of contacts) {
        try {
          const contactAlreadyExists =
            await this.contactsRepository.findByPhone(contact.id.user);

          if (!contactAlreadyExists) {
            const contactOrError = Contacts.create({
              name: contact.pushname || contact.shortName || "SEM NOME",
              phone: contact.id.user,
              photo: (await contact.getProfilePicUrl()) || "USUARIO_SEM_FOTO",
              companyId: companyId,
              whatsappId: contact.id._serialized,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            if (contactOrError.isLeft()) {
              console.log(
                `Erro ao preencher dados do contato | Empresa ID:${companyId} | Data: ${currentDateFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
                  contactOrError.value.message
                }`
              );
              return;
            }

            const newContact = contactOrError.value;

            await this.contactsRepository.create(newContact);
          }
        } catch (err) {
          console.log(
            `Erro ao salvar contato no banco de dados | Empresa ID: ${companyId} | Data: ${currentTimeFormatted()} as ${currentTimeFormatted()} | Detalhes: ${
              err.message
            }`
          );
        }
      }
    });

    whatsapp.on("auth_failure", async (message) => {
      console.log(
        `Erro ao iniciar sessão do WhatsApp | Empresa ID: ${companyId} | Detalhes: ${message}`
      );

      if (!session) {
        const newSession = Sessions.create({
          actived: false,
          authenticated: false,
          companyId,
          companySecret,
          qrcode: "SEM_QRCODE_ERRO_LOGIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (newSession.isRight()) {
          session = newSession.value;
        }
      }

      session.actived = false;
      session.authenticated = false;
      session.updatedAt = new Date();
      // session.qrcode = qrc;

      await this.sessionsRepository.createOrUpdate(session);
    });

    whatsapp.initialize();
  }

  process(processFunction: Processor<iDeliverWhatsappJob>): void {
    new Worker("@whatsapp:queue", processFunction, {
      connection: RedisConnection,
      concurrency: 100,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });

    new QueueScheduler("@whatsapp:queue", { connection: RedisConnection });
  }
}

export { WhatsappProvider };
