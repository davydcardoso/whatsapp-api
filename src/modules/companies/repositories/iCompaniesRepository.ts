import { Companies } from "../domain/companies";

export interface iCompaniesRepository {
  create(companies: Companies): Promise<void>;
  update(companies: Companies): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Companies>;
  findByEmail(email: string): Promise<Companies>;
  findByToken(token: string): Promise<Companies>;
  findByDocument(document: string): Promise<Companies>;
  findMany(): Promise<Companies[]>;
  findManyByName(name: string): Promise<Companies[]>;
}
