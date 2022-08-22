import { DomainError } from "@/core/domain/errors/DomainError";

class InvalidCompanyTokenError extends Error implements DomainError {
  constructor() {
    super("company token is not valid");

    this.name = "InvalidCompanyTokenError";
  }
}

export { InvalidCompanyTokenError };
