import { SingleCheck } from '../../interfaces';
import  { Strategy } from '../CheckStrategy';

export class Others implements Strategy {
  getChildren(check: SingleCheck): Array<any> {
    const children: Array<any> = [];
    const childProperty = check[check.type];
    if(childProperty.followUpCheckEntityId) {
      children.push({
        id: childProperty.followUpCheckEntityId,
        name: 'followUpCheckEntityId',
        type: check.type
      });
    }
    if(childProperty.timeDelayedCheckEntityId) {
      children.push({
        id: childProperty.timeDelayedCheckEntityId,
        name: 'timeDelayedCheckEntityId',
        type: check.type
      });
    }
    return children;
  }

  needsUpdateChildLink(parent: SingleCheck): boolean {
    return false;
  }

  updateChildLink(parent: SingleCheck, newChildId: String, existingChildId: String): SingleCheck {
    return parent;
  }
}