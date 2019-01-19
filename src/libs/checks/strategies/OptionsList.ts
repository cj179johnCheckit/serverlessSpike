import  { Strategy } from '../CheckStrategy';
import { OptionsListCheck } from '../../interfaces';

export class OptionsList implements Strategy {
  getChildren(check: OptionsListCheck): Array<any> {
    const children: Array<any> = [];
    check.optionsList.options.forEach((option: any) => {
      if (option.followUpCheckEntityId) {
        children.push({
          id: option.followUpCheckEntityId
        });
      }
      if (option.timeDelayedCheckEntityId) {
        children.push({
          id: option.timeDelayedCheckEntityId
        })
      }
    });
    return children;
  }

  needsUpdateChildLink(check: OptionsListCheck): boolean {
    return check.optionsList.options.length > 0;
  }

  updateChildLink(parent: OptionsListCheck, newChildId: String, existingChildId: String): OptionsListCheck {
    parent.optionsList.options = parent.optionsList.options.map((option: any) => {
      if (option.followUpCheckEntityId === existingChildId) {
        option.followUpCheckEntityId = newChildId;
      }
      if (option.timeDelayedCheckEntityId === existingChildId) {
        option.timeDelayedCheckEntityId = newChildId;
      }
      return option;
    });
    return parent;
  }
}