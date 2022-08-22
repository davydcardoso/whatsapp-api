import { Messages } from "@/modules/whatsapp/domain/messages";
import { MessagesMapper } from "@/modules/whatsapp/mappers/MessagesMapper";
import { iMessagesRepository } from "@/modules/whatsapp/repositories/iMessagesRepository";
import { PrismaClient } from "@prisma/client";

class MessagesRepository implements iMessagesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(message: Messages): Promise<void> {
    const data = MessagesMapper.toPersistence(message);

    await this.prisma.messages.create({ data });
  }

  async findByCompanyId(companyId: string): Promise<Messages[]> {
    const messages = await this.prisma.messages.findMany({
      where: { companyId },
    });

    return messages.map((message) => MessagesMapper.toDomain(message));
  }

  async findByContactId(contactId: string): Promise<Messages[]> {
    const messages = await this.prisma.messages.findMany({
      where: { contactId },
    });

    return messages.map((message) => MessagesMapper.toDomain(message));
  }
}

export { MessagesRepository };
