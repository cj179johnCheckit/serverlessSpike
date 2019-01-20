import { CheckList } from './strategies/checkList';
import { Others } from  './strategies/others';
import { OptionsList } from './strategies/optionsList';

export interface Strategy {
  getChildren: Function;
  updateChildLink: Function;
  needsUpdateChildLink: Function;
}

export interface StrategyMappings {
  [key: string]: any;
}

export class CheckStrategy {
  private strategyMappings: StrategyMappings = {
    checklist: CheckList,
    optionsList: OptionsList,
    temperature: Others,
    text: Others,
    acknowledgement: Others,
    dateEntry: Others
  };

  validateCheckType(checkType: string): Boolean {
    return Object.keys(this.strategyMappings).indexOf(checkType) > -1;
  }

  getStrategy(checkType: string): Strategy {
    if(!this.validateCheckType(checkType)) {
      throw new Error('The check type does not support');
    }
    const StractegyClass = this.strategyMappings[checkType];
    return new StractegyClass();
  }
}