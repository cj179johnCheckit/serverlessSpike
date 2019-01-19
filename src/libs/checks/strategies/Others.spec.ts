import { Others } from './Others';
import 'mocha';
import { assert } from 'chai';
import { cloneDeep } from 'lodash';
import { SingleCheck } from '../../interfaces';

const mongo = require('mongodb');

describe('Other check type strategy', () => {
  let others: Others;
  let fixture: SingleCheck;

  beforeEach(() => {
    others = new Others();
    fixture = {
      _id: new mongo.ObjectID(),
      breadcrumbs: [{
        name: 'parent-name',
        entityId: new mongo.ObjectID()
      }],
      name: 'test-parent',
      type: 'temperature',
      temperature: {
        followUpCheckEntityId: null,
        timeDelayedCheckEntityId: null
      }
    };
  });

  it('should get children of a check', () => {

    const fixtureClone = cloneDeep(fixture);
    const temperatureFollowUpCheckEntityId = new mongo.ObjectID();
    const temperatureTimeDelayedCheckEntityId = new mongo.ObjectID();

    const expected = [
      {
        id: temperatureFollowUpCheckEntityId
      },
      {
        id: temperatureTimeDelayedCheckEntityId
      }
    ];

    fixtureClone.temperature.followUpCheckEntityId = temperatureFollowUpCheckEntityId;
    fixtureClone.temperature.timeDelayedCheckEntityId = temperatureTimeDelayedCheckEntityId;


    const result = others.getChildren(fixtureClone);

    assert.deepEqual(expected, result);
  });

  it('should check if needs to update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);

    fixtureClone.temperature.timeDelayedCheckEntityId = new mongo.ObjectID()

    assert.isFalse(others.needsUpdateChildLink(fixture));
    assert.isTrue(others.needsUpdateChildLink(fixtureClone));
  });

  it('should update child link of a check', () => {
    const fixtureClone = cloneDeep(fixture);
    const followUpCheckEntityId = new mongo.ObjectID();
    const newChildId = new mongo.ObjectID();
    fixtureClone.temperature.followUpCheckEntityId = followUpCheckEntityId;

    const result = others.updateChildLink(fixtureClone, newChildId, followUpCheckEntityId);

    assert.equal(newChildId, result.temperature.followUpCheckEntityId);
  });

});

