import { UseCaseError } from "@/core/domain/errors/UseCaseError";

class EmailAlreadyRegisteredInTheSystemError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("email already registered in the system");

    this.name = "EmailAlreadyRegisteredInTheSystemError";
  }
}

export { EmailAlreadyRegisteredInTheSystemError };
