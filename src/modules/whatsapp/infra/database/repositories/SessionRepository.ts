import { Sessions } from "@/modules/whatsapp/domain/sessions";
import { SessionMapper } from "@/modules/whatsapp/mappers/SessionsMapper";
import { iSessionRepository } from "@/modules/whatsapp/repositories/iSessionRepository";
import { PrismaClient, SessionQrCode } from "@prisma/client";

class SessionRepository implements iSessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async disableAll(): Promise<void> {
    await this.prisma.$executeRawUnsafe(
      "update sessions set actived = false, authenticated = false, qrcode = ''"
    );
  }

  async createOrUpdate(session: Sessions): Promise<void> {
    const data = SessionMapper.toPersistence(session);
    await this.prisma.sessions.upsert({
      create: data,
      update: data,
      where: {
        companyId: data.companyId,
      },
    });
  }

  async getQrCode(companyId: string): Promise<SessionQrCode> {
    return await this.prisma.sessionQrCode.findUnique({ where: { companyId } });
  }

  async createQrCode(companyId: string, qrcode: string): Promise<void> {
    await this.prisma.sessionQrCode.upsert({
      create: { companyId, qrcode },
      update: { qrcode },
      where: { companyId },
    });
  }

  async enable(companyId: string): Promise<void> {
    await this.prisma.sessions.update({
      data: { actived: true },
      where: { companyId },
    });
  }

  async update(sessions: Sessions): Promise<void> {
    await this.prisma.sessions.update({
      data: sessions,
      where: { companyId: sessions.companyId },
    });
  }

  async createSession(session: Sessions): Promise<void> {
    const data = SessionMapper.toPersistence(session);

    await this.prisma.sessions.create({ data });
  }

  async delete(companyId: string): Promise<void> {
    await this.prisma.sessions.delete({ where: { companyId } });
  }

  async findByCompanyId(companyId: any): Promise<Sessions> {
    const session = await this.prisma.sessions.findUnique({
      where: { companyId },
    });

    if (!session) {
      return null;
    }

    return SessionMapper.toDomain(session);
  }

  async findAllActived(): Promise<Sessions[]> {
    const sessions = await this.prisma.sessions.findMany({
      where: { actived: true },
    });

    if (sessions.length === 0) {
      return null;
    }

    return sessions.map((session) => SessionMapper.toDomain(session));
  }

  async disable(companyId: string): Promise<void> {
    await this.prisma.sessions.update({
      data: { actived: false },
      where: { companyId },
    });
  }
}

export { SessionRepository };
