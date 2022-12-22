import { UseCaseError } from "@/core/domain/errors/UseCaseError";

export class CompanyNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Houve um erro ao localizar empresa em nossos sistemas");
  }
}
