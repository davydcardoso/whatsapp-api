import { UseCaseError } from "@/core/domain/errors/UseCaseError";

class DocumentAlreadyRegisteredInTheSystemError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("document is already registered in the system");

    this.name = "DocumentAlreadyRegisteredInTheSystemError";
  }
}

export { DocumentAlreadyRegisteredInTheSystemError };
