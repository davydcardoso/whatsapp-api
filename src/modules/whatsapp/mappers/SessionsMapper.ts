import { Sessions as SessionsPersistence } from "@prisma/client";
import { Sessions } from "../domain/sessions";

class SessionMapper {
  static toPersistence(raw: Sessions): SessionsPersistence {
    return {
      id: raw.id,
      actived: raw.actived,
      companyId: raw.companyId,
      companySecret: raw.companySecret,
      sessionJSON: raw.sesssionJSON,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDomain(raw: SessionsPersistence): Sessions {
    const sessionsOrError = Sessions.create(
      {
        actived: raw.actived,
        companyId: raw.companyId,
        companySecret: raw.companySecret,
        sessionJSON: raw.sessionJSON,
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
