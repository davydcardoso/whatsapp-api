import { UseCaseError } from "@/core/domain/errors/UseCaseError";

class ContactInformedHasNoMessagesError extends Error implements UseCaseError {
  constructor() {
    super("Contact informed has no messages");

    this.name = "ContactInformedHasNoMessagesError";
  }
}

export { ContactInformedHasNoMessagesError };
