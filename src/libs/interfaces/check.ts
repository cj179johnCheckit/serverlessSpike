import { ObjectID } from 'typeorm'

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


export interface CheckData {
  followUpCheckEntityId: ObjectID;
  timeDelayedCheckEntityId: ObjectID;
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
export interface CheckListItem {
  checkEntityId: ObjectID;
}

export interface CheckChildRef {
  id: ObjectID;
}
