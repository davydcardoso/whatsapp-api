export enum TypeJobWhatsApp {
  SESSION,
  CLOSE_SESSION,
  MESSAGE,
  MEDIA_MESSAGE,
}

export interface iDeliverWhatsappJob {
  type: TypeJobWhatsApp;
  sender: {
    companyId: string;
    companySecret: string;
  };
  recipient?: {
    phone: string;
    contactId: string;
    contactLocated: boolean;
    message: {
      isMedia: boolean;
      midiaFile?: {
        messageId: string;
        mediaMessageId: string;
        mediaType: string;
        filePath: string;
        fileName: string;
      };
      body: string;
    };
  };
}
