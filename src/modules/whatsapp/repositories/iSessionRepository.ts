import { SessionQrCode } from "@prisma/client";
import { Sessions } from "../domain/sessions";

export interface iSessionRepository {
  createSession(session: Sessions): Promise<void>;
  delete(companyId: string): Promise<void>;
  findByCompanyId(companyId): Promise<Sessions>;
  findAllActived(): Promise<Sessions[]>;
  disable(companyId: string): Promise<void>;
  enable(companyId: String): Promise<void>;
  update(sessions: Sessions): Promise<void>;
  createQrCode(companyId: string, qrcode: string): Promise<void>;
  getQrCode(companyId: string): Promise<SessionQrCode>;
  createOrUpdate(session: Sessions): Promise<void>;
  disableAll(): Promise<void>;
}
