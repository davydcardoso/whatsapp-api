import { Sessions } from "@/modules/whatsapp/domain/sessions";
import { SessionMapper } from "@/modules/whatsapp/mappers/SessionsMapper";
import { iSessionRepository } from "@/modules/whatsapp/repositories/iSessionRepository";
import { PrismaClient } from "@prisma/client";

class SessionRepository implements iSessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createQrCode(companyId: string, qrcode: string): Promise<void> {
    throw new Error("Method not implemented.");
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
