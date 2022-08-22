import { Controller } from "@/core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@/core/infra/HttpResponse";
import { SendWhatsAppTextMessage } from "./SendWhatsAppTextMessage";

type SendWhatsAppTextMessageControllerRequest = {
  companyid: string;
  companySecret: string;
  recipient: {
    phone: string;
    contactId: string;
    message: {
      body: string;
    };
  };
};

class SendWhatsAppTextMessageController implements Controller {
  constructor(
    private readonly sendWhatsAppTextMessage: SendWhatsAppTextMessage
  ) {}

  async handle(
    request: SendWhatsAppTextMessageControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { companyid, recipient, companySecret } = request;

      const result = await this.sendWhatsAppTextMessage.perform({
        companyid,
        companySecret,
        recipient,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}

export { SendWhatsAppTextMessageController };
