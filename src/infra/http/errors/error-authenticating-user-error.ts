import { DomainError } from "@/core/domain/errors/DomainError";

export class ErrorAuthenticatingUserError extends Error implements DomainError {
  constructor(err: string) {
    super(`Error authenticating user | Details: ${err}`);
    this.name = "ErrorAuthenticatingUserError";
  }
}
