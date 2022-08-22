import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

export enum MessageType {
  SENT,
  RECEIVED,
}

type MessagesProps = {
  companyId: string;
  contactId: string;
  type: MessageType;
  read: boolean;
  body: string;
  createdAt?: Date;
  updatedAt: Date;
};

class Messages extends Entity<MessagesProps> {
  get companyId() {
    return this.props.companyId;
  }

  get contactId() {
    return this.props.contactId;
  }

  get type() {
    return this.props.type;
  }

  get read() {
    return this.props.read;
  }

  get body() {
    return this.props.body;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: MessagesProps, id?: string) {
    super(props, id);
  }

  static create(props: MessagesProps, id?: string): Either<Error, Messages> {
    const messages = new Messages(props, id);

    return right(messages);
  }
}

export { Messages };
