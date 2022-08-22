import { iDeliverWhatsappJob } from "@/modules/whatsapp/jobs/iDeliverWhatsappJob";

export type Job = {
  job: iDeliverWhatsappJob;
};

export type iJobSession = {
  job: {
    companyId: string;
    companySecret: string;
  };
};

export interface iWhatsappProvider {
  process(processFunction: (job: any) => Promise<void>): void;
}
