import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type SessionsProps = {
  actived: boolean;
  companyId: string;
  companySecret: string;
  sessionJSON: string;
  createdAt?: Date;
  updatedAt: Date;
};

class Sessions extends Entity<SessionsProps> {
  get actived() {
    return this.props.actived;
  }

  get companyId() {
    return this.props.companyId;
  }

  get companySecret() {
    return this.props.companySecret;
  }

  get sesssionJSON() {
    return this.props.sessionJSON;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: SessionsProps, id?: string) {
    super(props, id);
  }

  static create(props: SessionsProps, id?: string): Either<Error, Sessions> {
    const sessions = new Sessions(props, id);

    return right(sessions);
  }
}

export { Sessions };
