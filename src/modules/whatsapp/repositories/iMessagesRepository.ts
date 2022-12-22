import { Messages } from "../domain/messages";

export interface iMessagesRepository {
  create(message: Messages): Promise<void>;
  delete(id: string): Promise<void>;
  findByCompanyId(companyId: string): Promise<Messages[]>;
  findByContactId(contactId: string): Promise<Messages[]>;
}
