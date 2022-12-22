import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class CompanySecretKeyIsInvalidError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Chave secreta da empresa está invalida");
  }
}
