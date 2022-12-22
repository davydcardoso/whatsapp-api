import { Controller } from "@/core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@/core/infra/HttpResponse";
import { SendWhatsAppFileMessage } from "./SendWhatsAppFileMessage";

type SendWhatsAppFileMessageControllerRequest = {
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: string;
  companyid: string;
  content: string;
};

export class SendWhatsAppFileMessageController implements Controller {
  constructor(
    private readonly sendWhatsAppFileMessage: SendWhatsAppFileMessage
  ) {}

  async handle(
    request: SendWhatsAppFileMessageControllerRequest
  ): Promise<HttpResponse> {
    try {
      const {
        size,
        path,
        mimetype,
        filename,
        companyid,
        destination,
        originalname,
        content,
      } = request;

      const result = await this.sendWhatsAppFileMessage.perform({
        size,
        path,
        mimetype,
        filename,
        destination,
        originalname,
        companyId: companyid,
        content: JSON.parse(content),
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}
