export interface Message {
  Body: string,
  ReceiptHandle: any
};

export interface MessageBody {
  Message: string
}

export interface MessagePayload {
  messageFilter: string,
  customerId: string,
  customerTemplateId: string
}