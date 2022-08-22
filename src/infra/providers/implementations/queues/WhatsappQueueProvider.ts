import { Queue } from "bullmq";

import { iDeliverWhatsappJob } from "@/modules/whatsapp/jobs/iDeliverWhatsappJob";
import { iWhatsappQueueProvider } from "../../contracts/iWhatsappQueueProvider";
import { RedisConnection } from "@/infra/redis/connection";

class WhatsappQueueProvider implements iWhatsappQueueProvider {
  private queue: Queue;

  constructor() {
    this.queue = new Queue("@whatsapp:queue", {
      connection: RedisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      },
    });
  }

  async startSession(Job: iDeliverWhatsappJob): Promise<void> {
    await this.queue.add("session", Job);
  }

  async sendMessage(job: iDeliverWhatsappJob): Promise<void> {
    await this.queue.add("message", job);
  }
}

export { WhatsappQueueProvider };
