import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type ContactsProps = {
  name: string;
  phone: string;
  photo: string;
  companyId: string;
  whatsappId: string;
  createdAt?: Date;
  updatedAt: Date;
};

class Contacts extends Entity<ContactsProps> {
  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  set photo(value: string) {
    this.props.photo = value;
  }

  get photo() {
    return this.props.photo;
  }

  get companyId() {
    return this.props.companyId;
  }

  get whatsappId() {
    return this.props.whatsappId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: ContactsProps, id?: string) {
    super(props, id);
  }

  static create(props: ContactsProps, id?: string): Either<Error, Contacts> {
    const contacts = new Contacts(props, id);

    return right(contacts);
  }
}

export { Contacts };
