import { Either, right } from "@/core/logic/Either";
import { iContactsRepository } from "../../repositories/iContactsRepository";

type GetAllContactsWhatsAppRequest = {
  companyid: string;
};

type GetAllContactsWhatsAppResponse = Either<
  Error,
  GetAllContactsWhatsAppResponseProps
>;

type GetAllContactsWhatsAppResponseProps = {
  contacts: {
    id: string;
    name: string;
    phone: string;
    photo: string;
    companyId: string;
    whatsappId: string;
    createdAt?: Date;
    updatedAt: Date;
  }[];
};

class GetAllContactsWhatsApp {
  constructor(private readonly contactsRepository: iContactsRepository) {}

  async perform({
    companyid,
  }: GetAllContactsWhatsAppRequest): Promise<GetAllContactsWhatsAppResponse> {
    const contacts = await this.contactsRepository.findByCompanyId(companyid);

    return right({
      contacts: contacts.map((contact) => {
        return {
          id: contact.id,
          name: contact.name,
          phone: contact.phone,
          photo: contact.photo,
          companyId: contact.companyId,
          whatsappId: contact.whatsappId,
          createdAt: contact.createdAt,
          updatedAt: contact.updatedAt,
        };
      }),
    });
  }
}

export { GetAllContactsWhatsApp };
