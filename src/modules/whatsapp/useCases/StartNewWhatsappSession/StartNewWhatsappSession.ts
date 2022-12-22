import { Either, left, right } from "@/core/logic/Either";
import { iWhatsappQueueProvider } from "@/infra/providers/contracts/iWhatsappQueueProvider";
import { iCompaniesRepository } from "@/modules/companies/repositories/iCompaniesRepository";
import { TypeJobWhatsApp } from "../../jobs/iDeliverWhatsappJob";
import { iSessionRepository } from "../../repositories/iSessionRepository";

type StartNewWhatsappSessionRequest = {
  companyid: string;
  companySecret: string;
};

type StartNewWhatsappSessionResponse = Either<
  Error,
  StartNewWhatsappSessionResponseProps
>;

type StartNewWhatsappSessionResponseProps = {
  message?: string;
};

class StartNewWhatsappSession {
  constructor(
    private readonly companiesRepository: iCompaniesRepository,
    private readonly whatsappQueueProvider: iWhatsappQueueProvider,
    private readonly sessionRepository: iSessionRepository
  ) {}

  async perform({
    companySecret,
    companyid: companyId,
  }: StartNewWhatsappSessionRequest): Promise<StartNewWhatsappSessionResponse> {
    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      return left(
        new Error("Não existe nenhum empresa cadastrada com esses dados")
      );
    }

    if (!company.actived) {
      return left(
        new Error(
          "A empresa informada/logada está com a conta desativada, favor entre em contato com o SUPORTE!"
        )
      );
    }

    const existingSession = await this.sessionRepository.findByCompanyId(
      companyId
    );

    if (existingSession && existingSession.actived) {
      return right({ message: `Já existe uma sessão ativa para está empresa` });
    }

    await this.whatsappQueueProvider.startSession({
      type: TypeJobWhatsApp.SESSION,
      sender: { companyId, companySecret },
    });

    return right({});
  }
}

export { StartNewWhatsappSession };
