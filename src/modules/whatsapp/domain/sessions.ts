import { Entity } from "@/core/domain/Entity";
import { Either, right } from "@/core/logic/Either";

type SessionsProps = {
  actived: boolean;
  authenticated: boolean;
  companyId: string;
  companySecret: string;
  qrcode?: string;
  createdAt?: Date;
  updatedAt: Date;
};

class Sessions extends Entity<SessionsProps> {
  get actived() {
    return this.props.actived;
  }

  set actived(value: boolean) {
    this.props.actived = value;
  }

  get authenticated() {
    return this.props.authenticated;
  }

  set authenticated(value: boolean) {
    this.props.authenticated = value;
  }

  get companyId() {
    return this.props.companyId;
  }

  get companySecret() {
    return this.props.companySecret;
  }

  get qrcode() {
    return this.props.qrcode;
  }

  set qrcode(value: string) {
    this.props.qrcode = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
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
