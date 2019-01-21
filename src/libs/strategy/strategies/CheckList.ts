import  { Strategy } from '../checkStrategy';
import { ChecklistCheck, CheckChildRef, CheckListItem } from '../../interfaces/check';
import { ObjectID } from 'typeorm';

export class CheckList implements Strategy {
  getChildren(check: ChecklistCheck): Array<CheckChildRef> {
    return check.checklist.checklistItems.map((item: CheckListItem) => ({
      id: item.checkEntityId
    }));
  }

  needsUpdateChildLink(parent: ChecklistCheck): boolean {
    return parent.checklist.checklistItems.length > 0;
  }

  updateChildLink(parent: ChecklistCheck, newChildId: ObjectID, existingChildId: ObjectID): ChecklistCheck {
    parent.checklist.checklistItems = parent.checklist.checklistItems.map((item: CheckListItem) => {
      if(item.checkEntityId && item.checkEntityId.equals(existingChildId)) {
        item.checkEntityId = newChildId;
      }
      return item;
    });
    return parent;
  }
}