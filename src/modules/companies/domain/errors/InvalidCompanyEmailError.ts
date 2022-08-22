import { DomainError } from "@/core/domain/errors/DomainError";

class InvalidCompanyEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email "${email}" is not valid`);

    this.name = "InvalidCompanyEmailError";
  }
}

export { InvalidCompanyEmailError };
