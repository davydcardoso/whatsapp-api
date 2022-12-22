import { PrismaClient } from "@prisma/client";

import { Companies } from "@/modules/companies/domain/companies";
import { CompaniesMapper } from "@/modules/companies/mappers/CompaniesMapper";
import { iCompaniesRepository } from "@/modules/companies/repositories/iCompaniesRepository";

class CompaniesRepository implements iCompaniesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByToken(token: string): Promise<Companies> {
    const company = await this.prisma.companies.findUnique({
      where: { token },
    });

    if (!company) {
      return null;
    }

    return CompaniesMapper.toDomain(company);
  }

  async create(companies: Companies): Promise<void> {
    const data = CompaniesMapper.toPersistence(companies);

    await this.prisma.companies.create({ data });
  }

  async update(companies: Companies): Promise<void> {
    const data = CompaniesMapper.toPersistence(companies);

    await this.prisma.companies.update({ data, where: { id: data.id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.companies.delete({ where: { id } });
  }

  async findById(id: string): Promise<Companies> {
    const company = await this.prisma.companies.findUnique({ where: { id } });

    if (!company) {
      return null;
    }

    return CompaniesMapper.toDomain(company);
  }

  async findByEmail(email: string): Promise<Companies> {
    const company = await this.prisma.companies.findUnique({
      where: { email },
    });

    if (!company) {
      return null;
    }

    return CompaniesMapper.toDomain(company);
  }

  async findByDocument(document: string): Promise<Companies> {
    const company = await this.prisma.companies.findUnique({
      where: { document },
    });

    if (!company) {
      return null;
    }

    return CompaniesMapper.toDomain(company);
  }

  async findMany(): Promise<Companies[]> {
    const companies = await this.prisma.companies.findMany();

    return companies.map((company) => CompaniesMapper.toDomain(company));
  }

  async findManyByName(name: string): Promise<Companies[]> {
    const companies = await this.prisma.companies.findMany({ where: { name } });

    return companies.map((company) => CompaniesMapper.toDomain(company));
  }
}

export { CompaniesRepository };
