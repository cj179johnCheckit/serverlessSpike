import { ChecklistCheck, OptionsListCheck, SingleCheck } from '../interfaces';

export interface Strategy {
  getChildren: Function;
}

export class CheckList implements Strategy{
  getChildren(check: ChecklistCheck): Array<any> {
    return check.checklist.checklistItems.map(item => ({
      id: item.checkEntityId,
      name: 'checkListItem',
      type: 'checklist'
    }));
  }
}

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
}

export class Others implements Strategy {
  getChildren(check: SingleCheck): Array<any> {
    const children: Array<any> = [];
    const childProperty = check[check.type];
    if (childProperty.followUpCheckEntityId) {
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
}

export interface StrategyMappings {
  [key: string]: any;
}

export class CheckStrategy {
  private strategyMappings: StrategyMappings = {
    checklist: CheckList,
    optionsList: OptionList,
    temperature: Others,
    text: Others,
    acknowledgement: Others,
    dateEntry: Others
  };

  validateCheckType(checkType: string): Boolean {
    return Object.keys(this.strategyMappings).indexOf(checkType) > -1;
  }

  getStractegy(checkType: string): Strategy {
    if(!this.validateCheckType) {
      throw new Error('The check type does not support');
    }
    const StractegyClass = this.strategyMappings[checkType];
    return new StractegyClass();
  }
}