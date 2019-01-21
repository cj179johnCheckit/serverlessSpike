import  { Strategy } from '../checkStrategy';
import { OptionsListCheck, CheckChildRef, CheckOptionsListOption } from '../../interfaces/check';
import { ObjectID } from 'typeorm';

export class OptionsList implements Strategy {
  getChildren(check: OptionsListCheck): Array<CheckChildRef> {
    const children: Array<CheckChildRef> = [];
    check.optionsList.options.forEach((option: CheckOptionsListOption) => {
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

  updateChildLink(parent: OptionsListCheck, newChildId: ObjectID, existingChildId: ObjectID): OptionsListCheck {
    parent.optionsList.options = parent.optionsList.options.map((option: CheckOptionsListOption) => {
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