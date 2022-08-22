import { Contacts } from "../domain/contacts";

export interface iContactsRepository {
  create(contact: Contacts): Promise<void>;
  update(contact: Contacts): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Contacts[]>;
  findById(id: string): Promise<Contacts>;
  findByPhone(phone: string): Promise<Contacts>;
  findByCompanyId(companyId: string): Promise<Contacts[]>;
  findByWhatsappId(whatsappId: string): Promise<Contacts>;
}
