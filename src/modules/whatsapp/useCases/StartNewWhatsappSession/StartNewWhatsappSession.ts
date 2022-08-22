import { Either, right } from "@/core/logic/Either";
import { iWhatsappQueueProvider } from "@/infra/providers/contracts/iWhatsappQueueProvider";
import { iCompaniesRepository } from "@/modules/companies/repositories/iCompaniesRepository";
import { TypeJobWhatsApp } from "../../jobs/iDeliverWhatsappJob";

type StartNewWhatsappSessionRequest = {
  companyid: string;
  companySecret: string;
};

type StartNewWhatsappSessionResponse = Either<
  Error,
  StartNewWhatsappSessionResponseProps
>;

type StartNewWhatsappSessionResponseProps = {};

class StartNewWhatsappSession {
  constructor(
    private readonly companiesRepository: iCompaniesRepository,
    private readonly whatsappQueueProvider: iWhatsappQueueProvider
  ) {}

  async perform({
    companySecret,
    companyid: companyId,
  }: StartNewWhatsappSessionRequest): Promise<StartNewWhatsappSessionResponse> {
    await this.whatsappQueueProvider.startSession({
      type: TypeJobWhatsApp.SESSION,
      sender: { companyId, companySecret },
    });

    return right({});
  }
}

export { StartNewWhatsappSession };
