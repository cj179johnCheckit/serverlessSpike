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

export interface ConfigMapping {
  [key: string]: string;
  NODE_ENV: string;
  CHECKITDB_URI: string;
}

export interface BootstrapConfig {
  [key: string]: any;
};

// export interface Check {
//   // id: ObjectID;
//   name: string;
//   type: string;
// }

export interface ChecklistCheck extends Check {
  type: 'checklist';
  checklist: {
    checklistItems: any[];
  }
}

export interface OptionsListCheck extends Check {
  type: 'optionsList';
  optionsList: {
    options: any[];
  }
}

import { ObjectID } from 'typeorm'
export interface CheckData {
  followUpCheckEntityId: string;
  timeDelayedCheckEntityId: string;
}

export type OtherCheckTypes = 'temperature' | 'dateEntry' | 'acknowledgement' | 'text';

export interface SingleCheck extends Check {
  type: OtherCheckTypes;
  temperature?: CheckData;
  dateEntry?: CheckData;
  acknowledgement?: CheckData;
  text?: CheckData;
}

export interface ChecklistCheck extends Check {
  type: 'checklist';
  checklist: {
    checklistItems: any[];
  }
}
export interface BreadcrumbId {
  name: string,
  entityId: ObjectID
};
export interface Check {
  _id: ObjectID;
  name: string;
  type: string;
  breadcrumbs: BreadcrumbId[];
  version: number;
  customerId: string;
}