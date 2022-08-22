import { Either, left, right } from "@/core/logic/Either";
import { InvalidCompanyDocumentError } from "./errors/InvalidCompanyDocumentError";

class Documents {
  private readonly document: string;

  private constructor(value: string) {
    this.document = value;
  }

  get value() {
    return this.document;
  }

  static validate(value: string): boolean {
    if (!value || value.trim().length < 5 || value.trim().length > 255) {
      return false;
    }

    const regex =
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

    if (!regex.test(value)) {
      return false;
    }

    return true;
  }

  static create(value: string): Either<InvalidCompanyDocumentError, Documents> {
    if (!this.validate(value)) {
      return left(new InvalidCompanyDocumentError(value));
    }

    return right(new Documents(value));
  }
}

export { Documents };
