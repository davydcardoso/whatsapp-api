import { Controller } from "@/core/infra/Controller";
import { WhatsappQueueProvider } from "@/infra/providers/implementations/queues/WhatsappQueueProvider";

import { StartNewWhatsappSession } from "@/modules/whatsapp/useCases/StartNewWhatsappSession/StartNewWhatsappSession";
import { StartNewWhatsappSessionController } from "@/modules/whatsapp/useCases/StartNewWhatsappSession/StartNewWhatsappSessionController";

export function makeStartNewWhatsappSessionController(): Controller {
  const whatsappQueueProvider = new WhatsappQueueProvider();

  return new StartNewWhatsappSessionController(
    new StartNewWhatsappSession(null, whatsappQueueProvider)
  );
}
