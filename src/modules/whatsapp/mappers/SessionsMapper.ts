import { Sessions as SessionsPersistence } from "@prisma/client";
import { Sessions } from "../domain/sessions";

class SessionMapper {
  static toPersistence(raw: Sessions): SessionsPersistence {
    return {
      id: raw.id,
      actived: raw.actived,
      authenticated: raw.authenticated,
      companyId: raw.companyId,
      companySecret: raw.companySecret,
      qrcode: raw.qrcode,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: SessionsPersistence): Sessions {
    const sessionsOrError = Sessions.create(
      {
        actived: raw.actived,
        authenticated: raw.authenticated,
        companyId: raw.companyId,
        companySecret: raw.companySecret,
        qrcode: raw.qrcode,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );

    if (sessionsOrError.isLeft()) {
      return null;
    }

    return sessionsOrError.value;
  }
}

export { SessionMapper };
