import  { Strategy } from '../CheckStrategy';
import { OptionsListCheck } from '../../interfaces';

export class OptionList implements Strategy {
  getChildren(check: OptionsListCheck): Array<any> {
    const children: Array<any> = [];
    check.optionsList.options.forEach((option: any) => {
      if(option.followUpCheckEntityId) {
        children.push({
          id: option.followUpCheckEntityId,
          name: 'followUpCheckEntityId',
          type: check.type
        });
      }
      if(option.timeDelayedCheckEntityId) {
        children.push({
          id: option.timeDelayedCheckEntityId,
          name: 'timeDelayedCheckEntityid',
          type: check.type
        })
      }
    });
    return children;
  }

  needsUpdateChildLink(parent: OptionsListCheck): boolean {
    return false;
  }

  updateChildLink(parent: OptionsListCheck, newChildId: String, existingChildId: String): OptionsListCheck {
    return parent;
  }
}