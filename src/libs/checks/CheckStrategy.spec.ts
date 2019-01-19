import { CheckStrategy } from './CheckStrategy';
import 'mocha';
import { assert, expect } from 'chai';

export interface TypeMappings {
  [key: string]: string;
}

describe('Check strategy', () => {
  let checkStrategy: CheckStrategy;

  beforeEach(() => {
    checkStrategy = new CheckStrategy();
  });

  it('should return strategy base on valid check type', () => {
    const typeMappings :TypeMappings = {
      checklist: 'CheckList',
      optionsList: 'OptionsList',
      temperature: 'Others',
      text: 'Others',
      acknowledgement: 'Others',
      dateEntry: 'Others'
    }

    Object.keys(typeMappings).forEach((key: string) => {
      const strategy = checkStrategy.getStrategy(key);

      assert.equal(strategy.constructor.name, typeMappings[key]);
    });
  });

  it('should throw an error if requirs an invalid strategy', () => {
    assert.throws(() => checkStrategy.getStrategy('CAUSEDERROR'));
  });
});