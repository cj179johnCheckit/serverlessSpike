import { CheckList } from './CheckList';
import 'mocha';
import { assert } from 'chai';
import { cloneDeep } from 'lodash';
import { ChecklistCheck } from '../../interfaces';

const mongo = require('mongodb');

describe('Check list strategy', () => {
  let checkList: CheckList;
  let fixture: ChecklistCheck;

  beforeEach(() => {
    checkList = new CheckList();
    fixture = {
      _id: new mongo.ObjectID(),
      breadcrumbs: [{
        name: 'parent-name',
        entityId: new mongo.ObjectID()
      }],
      name: 'test-parent',
      type: 'checklist',
      checklist: {
        checklistItems: []
      }
    };
  });

  it('should get children of a check', () => {
    const fixtureClone = cloneDeep(fixture);
    const fixtureId = new mongo.ObjectID();

    const fixtureCheckListItem = {
      checkEntityId: fixtureId
    };

    fixtureClone.checklist.checklistItems.push(fixtureCheckListItem);

    const expected = [{
      id: fixtureId
    }];

    const result = checkList.getChildren(fixtureClone);

    assert.deepEqual(expected, result);
  });

  it('should check if needs to update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);

    const fixtureCheckListItem = {
      checkEntityId: new mongo.ObjectID()
    };

    fixtureClone.checklist.checklistItems.push(fixtureCheckListItem);

    assert.isFalse(checkList.needsUpdateChildLink(fixture));
    assert.isTrue(checkList.needsUpdateChildLink(fixtureClone));
  });

  it('should update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);
    const fixtureId = new mongo.ObjectID();
    const newChildId = new mongo.ObjectID();
    const fixtureCheckListItem = {
      checkEntityId: fixtureId
    }

    fixtureClone.checklist.checklistItems.push(fixtureCheckListItem);

    const result = checkList.updateChildLink(fixtureClone, newChildId, fixtureId);

    assert.equal(newChildId, result.checklist.checklistItems[0].checkEntityId);
  });
});

