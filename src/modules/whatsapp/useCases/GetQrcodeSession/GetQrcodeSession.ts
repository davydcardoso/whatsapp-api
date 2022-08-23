import { Either, left, right } from "@/core/logic/Either";
import { currentDateFormatted, currentTimeFormatted } from "@/utils/date-time";
import { iSessionRepository } from "../../repositories/iSessionRepository";

type GetQrcodeSessionRequest = {
  companyid: string;
  companySecret: string;
};

type GetQrcodeSessionResponse = Either<Error, GetQrcodeSessionResponseProps>;

type GetQrcodeSessionResponseProps = {
  actived: boolean;
  authenticated: boolean;
  companyId: string;
  companySecret: string;
  qrcode?: string;
  createdAt?: Date;
  updatedAt: Date;
};

class GetWhatsappSession {
  constructor(private readonly sessionsRepository: iSessionRepository) {}

  async perform({
    companyid: companyId,
    companySecret,
  }: GetQrcodeSessionRequest): Promise<GetQrcodeSessionResponse> {
    const session = await this.sessionsRepository.findByCompanyId(companyId);

    if (!session) {
      return left(new Error("Company does not have any session in the system"));
    }

    const { actived, authenticated, createdAt, qrcode, updatedAt } = session;

    return right({
      actived,
      authenticated,
      createdAt,
      qrcode,
      updatedAt,
      companyId,
      companySecret,
    });
  }
}

export { GetWhatsappSession };
