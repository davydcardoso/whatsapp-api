import { UseCaseError } from "@/core/domain/errors/UseCaseError";

class ContactIsNotExistsInSystemError extends Error implements UseCaseError {
  constructor() {
    super("Contact is not exists in system");

    this.name = "ContactIsNotExistsInSystemError";
  }
}

export { ContactIsNotExistsInSystemError };
