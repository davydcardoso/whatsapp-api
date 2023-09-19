import { Either, left, right } from "@/core/logic/Either";
import { InvalidWebhookValueError } from "./errors/InvalidWebhookValueError";

class Webhook {
  private readonly webhook: string;

  get value() {
    return this.webhook;
  }

  private constructor(value: string) {
    this.webhook = value;
  }

  static validate(value: string): boolean {
    if (!value || value.trim().length < 5 || value.trim().length > 255) {
      return false;
    }

    const regex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!regex.test(value)) {
      return false;
    }

    return true;
  }

  static create(value: string): Either<InvalidWebhookValueError, Webhook> {
    if (!this.validate(value)) {
      return left(new InvalidWebhookValueError());
    }

    return right(new Webhook(value));
  }
}

export { Webhook };
