import { SingleCheck, CheckChildRef } from '../../interfaces/check';
import  { Strategy } from '../checkStrategy';
import { ObjectID } from 'typeorm';

interface ChildFieldEntity {
  folllwCheckEntityId: ObjectID;
  timeDelayedCheckEntityId: ObjectID;
}

interface ChildField {
  temperature? : ChildFieldEntity;
  text? : ChildFieldEntity;
  acknowledgement? : ChildFieldEntity;
  dateEntry? : ChildFieldEntity;
}

export class Others implements Strategy {
  getChildren(check: SingleCheck): Array<CheckChildRef> {
    const children: Array<CheckChildRef> = [];
    const childProperty = check[check.type];
    if(childProperty.followUpCheckEntityId) {
      children.push({
        id: childProperty.followUpCheckEntityId
      });
    }
    if(childProperty.timeDelayedCheckEntityId) {
      children.push({
        id: childProperty.timeDelayedCheckEntityId
      });
    }
    return children;
  }

  needsUpdateChildLink(parent: SingleCheck): boolean {
    const childLinksField = parent[parent.type];
    return childLinksField.followUpCheckEntityId !== null
      || childLinksField.timeDelayedCheckEntityId !== null;
  }

  updateChildLink(parent: SingleCheck, newChildId: ObjectID, existingChildId: ObjectID): SingleCheck {
    const childField = parent[parent.type];
    if (childField.followUpCheckEntityId === existingChildId) {
      childField.followUpCheckEntityId = newChildId;
    }
    if (childField.timeDelayedCheckEntityId === existingChildId) {
      childField.timeDelayedCheckEntityId = newChildId;
    }
    parent[parent.type] = childField;
    return parent;
  }
}