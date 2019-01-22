export interface Message {
  Body: string;
  ReceiptHandle: any;
};

export interface MessageBody {
  Message: string;
}

export interface MessageReponse {
  Messages: Message [];
}
export interface MessagePayload {
  messageFilter: string,
  customerId: string,
  customerTemplateId: string
}

export interface ConfigMapping {
  [key: string]: string;
  NODE_ENV: string;
  CHECKITDB_URI: string;
}

export interface BootstrapConfig {
  [key: string]: any;
};

