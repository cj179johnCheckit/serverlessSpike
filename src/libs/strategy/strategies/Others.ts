import { SingleCheck, OtherCheckTypes } from '../../interfaces';
import  { Strategy } from '../../strategy/CheckStrategy';

export class Others implements Strategy {
  getChildren(check: SingleCheck): Array<any> {
    const children: Array<any> = [];
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

  updateChildLink(parent: SingleCheck, newChildId: string, existingChildId: string): SingleCheck {
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