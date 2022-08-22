export enum TypeJobWhatsApp {
  SESSION,
  MESSAGE,
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
      body: string;
    };
  };
}
