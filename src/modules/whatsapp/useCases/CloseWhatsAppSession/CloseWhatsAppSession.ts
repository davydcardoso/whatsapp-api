import { Either, left, right } from "@/core/logic/Either";
import { iCompaniesRepository } from "@/modules/companies/repositories/iCompaniesRepository";
import { iSessionRepository } from "../../repositories/iSessionRepository";
import { iWhatsappQueueProvider } from "@/infra/providers/contracts/iWhatsappQueueProvider";
import { TypeJobWhatsApp } from "../../jobs/iDeliverWhatsappJob";

type CloseWhatsAppSessionRequest = {
  companyId: string;
};

type CloseWhatsAppSessionResponse = Either<
  Error,
  CloseWhatsAppSessionResponseProps
>;

type CloseWhatsAppSessionResponseProps = {};

export class CloseWhatsAppSession {
  constructor(
    private readonly sessionRepository: iSessionRepository,
    private readonly companyRepository: iCompaniesRepository,
    private readonly whatsappQueueProvider: iWhatsappQueueProvider
  ) {}

  async perform({
    companyId,
  }: CloseWhatsAppSessionRequest): Promise<CloseWhatsAppSessionResponse> {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      return left(
        new Error(
          "Houve um erro inesperado, a empresa informada não existe no sistema"
        )
      );
    }

    if (!company.actived) {
      return left(
        new Error(
          "Empresa informada/logada está com a conta desativada, entre em contato com o SUPORTE"
        )
      );
    }

    const session = await this.sessionRepository.findByCompanyId(companyId);

    if (!session) {
      return left(
        new Error("Nao existe nenhum sessão registrada para essa empresa")
      );
    }

    if (session.actived) {
      return left(new Error("Sessão do whatsapp já está desativada"));
    }

    await this.whatsappQueueProvider.closeSession({
      type: TypeJobWhatsApp.CLOSE_SESSION,
      sender: {
        companyId,
        companySecret: company.secret,
      },
    });

    return right({ message: "Sua sessão será desconectada em instantes" });
  }
}
