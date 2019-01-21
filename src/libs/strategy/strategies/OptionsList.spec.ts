import { OptionsList } from './optionsList';
import 'mocha';
import { assert } from 'chai';
import { cloneDeep } from 'lodash';
import { OptionsListCheck } from '../../interfaces/check';

const mongo = require('mongodb');

describe('Option list strategy', () => {
  let optionsList: OptionsList;
  let fixture: OptionsListCheck;

  beforeEach(() => {
    optionsList = new OptionsList();
    fixture = {
      _id: new mongo.ObjectID(),
      breadcrumbs: [{
        name: 'parent-name',
        entityId: new mongo.ObjectID()
      }],
      name: 'test-parent',
      type: 'optionsList',
      optionsList: {
        options: []
      },
      version: Date.now(),
      customerId: 'test-customer-id'
    };
  });

  it('should get children of a check', () => {
    const fixtureClone = cloneDeep(fixture);
    const fixtureId = new mongo.ObjectID();

    const fixtureOption = {
      followUpCheckEntityId: fixtureId
    };

    fixtureClone.optionsList.options.push(fixtureOption);

    const expected = [{
      id: fixtureId
    }];

    const result = optionsList.getChildren(fixtureClone);

    assert.deepEqual(expected, result);
  });

  it('should check if needs to update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);

    const fixtureOption = {
      timeDelayedCheckEntityId: new mongo.ObjectID()
    };

    fixtureClone.optionsList.options.push(fixtureOption);

    assert.isFalse(optionsList.needsUpdateChildLink(fixture));
    assert.isTrue(optionsList.needsUpdateChildLink(fixtureClone));
  });

  it('should update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);
    const followUpCheckEntityId = new mongo.ObjectID();
    const newChildId = new mongo.ObjectID();
    fixtureClone.optionsList.options = [
      { followUpCheckEntityId },
      { timeDelayedCheckEntityId: new mongo.ObjectID() }
    ];

    const result = optionsList.updateChildLink(fixtureClone, newChildId, followUpCheckEntityId);

    assert.equal(newChildId, result.optionsList.options[0].followUpCheckEntityId);
  });
});

