import { Either, right } from "@/core/logic/Either";
import { currentDateFormatted, currentTimeFormatted } from "@/utils/date-time";
import { iSessionRepository } from "../../repositories/iSessionRepository";

type GetQrcodeSessionRequest = {
  companyid: string;
  companySecret: string;
};

type GetQrcodeSessionResponse = Either<Error, GetQrcodeSessionResponseProps>;

type GetQrcodeSessionResponseProps = {
  qrcode: string;
  createdAt: string;
  updatedAt: string;
};

class GetQrcodeSession {
  constructor(private readonly sessionsRepository: iSessionRepository) {}

  async perform({
    companyid: companyId,
    companySecret,
  }: GetQrcodeSessionRequest): Promise<GetQrcodeSessionResponse> {
    const qrcodeSession = await this.sessionsRepository.getQrCode(companyId);

    return right({
      qrcode: qrcodeSession.qrcode,
      createdAt: currentDateFormatted(qrcodeSession.createdAt),
      updatedAt: `${currentDateFormatted(
        qrcodeSession.updatedAt
      )} as ${currentTimeFormatted(qrcodeSession.updatedAt)}`,
    });
  }
}

export { GetQrcodeSession };
