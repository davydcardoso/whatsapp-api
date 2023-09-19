import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class InvalidWebhookValueError extends Error implements UseCaseError {
  constructor() {
    super("Webhook informado está invalido");
    this.name = "InvalidWebhookValueError";
  }
}
