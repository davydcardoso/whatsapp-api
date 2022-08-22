import { PrismaClient } from "@prisma/client";

import { Contacts } from "@/modules/whatsapp/domain/contacts";
import { ContactsMapper } from "@/modules/whatsapp/mappers/ContactsMapper";
import { iContactsRepository } from "@/modules/whatsapp/repositories/iContactsRepository";

class ContactsRepository implements iContactsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByWhatsappId(whatsappId: string): Promise<Contacts> {
    const contact = await this.prisma.contacts.findUnique({
      where: { whatsappId },
    });

    if (!contact) {
      return null;
    }

    return ContactsMapper.toDomain(contact);
  }

  async create(contact: Contacts): Promise<void> {
    const data = ContactsMapper.toPersistence(contact);

    await this.prisma.contacts.create({ data });
  }

  async update(contact: Contacts): Promise<void> {
    const data = ContactsMapper.toPersistence(contact);

    await this.prisma.contacts.update({
      data,
      where: { whatsappId: data.companyId },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contacts.delete({ where: { id } });
  }

  async findAll(): Promise<Contacts[]> {
    const contacts = await this.prisma.contacts.findMany();

    if (!contacts || contacts.length === 0) {
      return null;
    }

    return contacts.map((contact) => ContactsMapper.toDomain(contact));
  }

  async findById(id: string): Promise<Contacts> {
    const contact = await this.prisma.contacts.findUnique({ where: { id } });

    if (!contact) {
      return null;
    }

    return ContactsMapper.toDomain(contact);
  }

  async findByPhone(phone: string): Promise<Contacts> {
    const contact = await this.prisma.contacts.findUnique({ where: { phone } });

    if (!contact) {
      return null;
    }

    return ContactsMapper.toDomain(contact);
  }

  async findByCompanyId(companyId: string): Promise<Contacts[]> {
    const contacts = await this.prisma.contacts.findMany({
      where: { companyId },
    });

    if (!contacts || contacts.length === 0) {
      return null;
    }

    return contacts.map((contact) => ContactsMapper.toDomain(contact));
  }
}

export { ContactsRepository };
