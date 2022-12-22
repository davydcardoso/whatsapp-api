import { MediaMessage } from "../domain/mediaMessages";

export interface iMediaMessagesRepository {
  create(mediaMessage: MediaMessage): Promise<void>;
  update(mediaMessage: MediaMessage): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<MediaMessage[]>;
  findByMessageId(messageId: string): Promise<MediaMessage>;
  findByCompanyId(companyId: string): Promise<MediaMessage[]>;
}
