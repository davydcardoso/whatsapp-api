import { Either, left, right } from "@/core/logic/Either";
import { InvalidCompanyNameError } from "./errors/InvalidCompanyNameError";

class Name {
  private readonly name: string;

  private constructor(value: string) {
    this.name = value;
  }

  get value() {
    return this.name;
  }

  static validate(value: string): Boolean {
    if (!value || value.trim().length < 5 || value.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(value: string): Either<InvalidCompanyNameError, Name> {
    if (!this.validate(value)) {
      return left(new InvalidCompanyNameError(value));
    }

    return right(new Name(value));
  }
}

export { Name };
