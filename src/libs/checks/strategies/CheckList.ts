import  { Strategy } from '../CheckStrategy';
import { ChecklistCheck } from '../../interfaces';

export class CheckList implements Strategy {
  getChildren(check: ChecklistCheck): Array<any> {
    return check.checklist.checklistItems.map(item => ({
      id: item.checkEntityId,
      name: 'checkListItem',
      type: 'checklist'
    }));
  }

  needsUpdateChildLink(parent: ChecklistCheck): boolean {
    return parent.checklist.checklistItems.length > 0;
  }

  updateChildLink(parent: ChecklistCheck, newChildId: String, existingChildId: String): ChecklistCheck {
    parent.checklist.checklistItems = parent.checklist.checklistItems.map(item => {
      if(item.checkEntityId === existingChildId) {
        item.checkEntityId = newChildId;
      }
      return item;
    });
    return parent;
  }
}