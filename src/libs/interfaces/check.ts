import { ObjectID } from 'typeorm'

export interface ChecklistCheck extends Check {
  type: 'checklist';
  checklist: {
    checklistItems: CheckListItem[];
  }
}

export interface OptionsListCheck extends Check {
  type: 'optionsList';
  optionsList: {
    options: CheckOptionsListOption[];
  }
}

export interface CheckData {
  followUpCheckEntityId: ObjectID | null;
  timeDelayedCheckEntityId: ObjectID | null;
}

export type OtherCheckTypes = 'temperature' | 'dateEntry' | 'acknowledgement' | 'text';

export interface SingleCheck extends Check {
  type: OtherCheckTypes;
  temperature?: CheckData;
  dateEntry?: CheckData;
  acknowledgement?: CheckData;
  text?: CheckData;
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

export interface CheckOptionsListOption {
  followUpCheckEntityId?: ObjectID | null;
  timeDelayedCheckEntityId?: ObjectID | null;
}
