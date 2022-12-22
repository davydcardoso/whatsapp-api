import { MediaMessage } from "@/modules/whatsapp/domain/mediaMessages";
import { MediaMessageMapper } from "@/modules/whatsapp/mappers/MediaMessageMapper";
import { iMediaMessagesRepository } from "@/modules/whatsapp/repositories/iMediaMessagesRepository";
import { PrismaClient } from "@prisma/client";

export class MediaMessagesRepository implements iMediaMessagesRepository {
  constructor(private prisma: PrismaClient) {}

  async create(mediaMessage: MediaMessage): Promise<void> {
    const data = MediaMessageMapper.toPersistence(mediaMessage);

    await this.prisma.mediaMessages.create({ data });
  }

  async update(mediaMessage: MediaMessage): Promise<void> {
    const data = MediaMessageMapper.toPersistence(mediaMessage);

    await this.prisma.mediaMessages.update({ data, where: { id: data.id } });
  }

  async delete(id: string): Promise<void> {
    const mediaMessage = await this.prisma.mediaMessages.findUnique({
      where: { id },
    });

    if (!mediaMessage) {
      return null;
    }

    await this.prisma.mediaMessages.delete({ where: { id } });
  }

  async findAll(): Promise<MediaMessage[]> {
    const mediaMessages = await this.prisma.mediaMessages.findMany();

    if (mediaMessages.length <= 0 || mediaMessages == null) {
      return null;
    }

    return mediaMessages.map((item) => MediaMessageMapper.toDomain(item));
  }

  async findByMessageId(messageId: string): Promise<MediaMessage> {
    const mediaMessage = await this.prisma.mediaMessages.findFirst({
      where: { messageId },
    });

    if (!mediaMessage) {
      return null;
    }

    return MediaMessageMapper.toDomain(mediaMessage);
  }

  async findByCompanyId(companyId: string): Promise<MediaMessage[]> {
    const mediaMessages = await this.prisma.mediaMessages.findMany({
      where: { companyId },
    });

    if (mediaMessages.length <= 0 || mediaMessages == null) {
      return null;
    }

    return mediaMessages.map((item) => MediaMessageMapper.toDomain(item));
  }
}
