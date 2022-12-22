import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type MediaMessagesProps = {
  companyId: string;
  messageId: string;
  fileName: string;
  originalName: string;
  mimetype: string;
  destination: string;
  createdAt?: Date;
  updatedAt: Date;
};

export class MediaMessage extends Entity<MediaMessagesProps> {
  get companyId() {
    return this.props.companyId;
  }

  get messageId() {
    return this.props.messageId;
  }

  get fileName() {
    return this.props.fileName;
  }

  get originalName() {
    return this.props.originalName;
  }

  get mimetype() {
    return this.props.mimetype;
  }

  get destination() {
    return this.props.destination;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: MediaMessagesProps, id?: string) {
    super(props, id);
  }

  static create(
    props: MediaMessagesProps,
    id?: string
  ): Either<Error, MediaMessage> {
    const mediaMessage = new MediaMessage(props, id);

    return right(mediaMessage);
  }
}
