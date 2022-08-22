import { DomainError } from "@/core/domain/errors/DomainError";
import { UseCaseError } from "@/core/domain/errors/UseCaseError";

class InvalidCompanyDocumentError extends Error implements DomainError {
  constructor(document: string) {
    super(`The document "${document}" is not valid`);

    this.name = "InvalidCompanyDocumentError";
  }
}

export { InvalidCompanyDocumentError };
