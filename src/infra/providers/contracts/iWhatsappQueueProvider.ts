import { iDeliverWhatsappJob } from "@/modules/whatsapp/jobs/iDeliverWhatsappJob";

export type Job = {
  job: iDeliverWhatsappJob;
};

export interface iWhatsappQueueProvider {
  sendMessage(job: iDeliverWhatsappJob): Promise<void>;
  startSession(Job: iDeliverWhatsappJob): Promise<void>;
  closeSession(job: iDeliverWhatsappJob): Promise<void>;
}
