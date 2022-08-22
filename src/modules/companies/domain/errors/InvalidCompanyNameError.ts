import { DomainError } from "@/core/domain/errors/DomainError";

class InvalidCompanyNameError extends Error implements DomainError {
  constructor(name: string) {
    super(`The name "${name}" is not valid`);

    this.name = "InvalidCompanyNameError";
  }
}

export { InvalidCompanyNameError };
