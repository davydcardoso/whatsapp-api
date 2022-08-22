import { Either, left, right } from "@/core/logic/Either";
import { InvalidCompanyEmailError } from "./errors/InvalidCompanyEmailError";

class Email {
  private readonly email: string;

  private constructor(value: string) {
    this.email = value;
  }

  get value() {
    return this.email;
  }

  static validate(value: string): boolean {
    if (!value || value.trim().length < 5 || value.trim().length > 255) {
      return false;
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!regex.test(value)) {
      return false;
    }

    return true;
  }

  static create(value: string): Either<InvalidCompanyEmailError, Email> {
    if (!this.validate(value)) {
      return left(new InvalidCompanyEmailError(value));
    }

    return right(new Email(value));
  }
}

export { Email };
