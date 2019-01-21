import { SingleCheck, CheckChildRef } from '../../interfaces/check';
import  { Strategy } from '../checkStrategy';
import { ObjectID } from 'typeorm';

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
    const followUpId = childField.followUpCheckEntityId || null;
    const timeDelayedId = childField.timeDelayedCheckEntityId || null;

    if (followUpId && followUpId.equals(existingChildId)) {
      childField.followUpCheckEntityId = newChildId;
    }
    if (timeDelayedId && timeDelayedId.equals(existingChildId)) {
      childField.timeDelayedCheckEntityId = newChildId;
    }

    parent[parent.type] = childField;
    return parent;
  }
}