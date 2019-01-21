import { SingleImport } from './SingleImport';
import 'mocha';
import { assert } from 'chai';
import { cloneDeep } from 'lodash';
import * as Sinon from 'ts-sinon';
import { MongoService } from './mongo';

const mongo = require('mongodb');
const sinon = Sinon.default;

describe('Single check import', () => {

  let singleImport: SingleImport;
  let mongoService: MongoService;
  let dbConnectionStub: {};
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    dbConnectionStub = {
      db: sandbox.stub()
    };

    mongoService = new MongoService(dbConnectionStub);

    singleImport = new SingleImport(mongoService);
  });

  afterEach(() => sandbox.restore());

  it('should create copy of a check', () => {
    const newCustomerId = 'test-customer-id';

    const fixture = {
      _id: new mongo.ObjectID(),
      name: 'test-temperature-check',
      type: 'temperature',
      breadcrumbs: [
        {
          name: 'test-text-test-exsting-parent',
          entityId: new mongo.ObjectID()
        }
      ],
      temperature: {
        followUpCheckEntityId: new mongo.ObjectID(),
        timeDelayedCheckEntityId: new mongo.ObjectID(),
      },
      version: Date.now(),
      customerId: 'old-customer-id'
    };

    const fixtureParent = {
      _id: new mongo.ObjectID(),
      name: 'test-text-check',
      type: 'text',
      breadcrumbs: [{
        name: 'test-text-check-parent',
        entityId: new mongo.ObjectID()
      }],
      version: Date.now(),
      customerId: newCustomerId
    };

    const result = singleImport.copyCheck(fixture, cloneDeep(fixtureParent), newCustomerId);

    assert.notEqual(result._id, fixture._id);
    assert.equal(result.name, fixture.name);
    assert.equal(result.customerId, newCustomerId);
    assert.deepEqual(result.breadcrumbs, fixtureParent.breadcrumbs.concat([{
      name: fixtureParent.name, entityId: fixtureParent._id
    }]));
  });

  it('should copy root check', () => {
    const newCustomerId = 'test-customer-id';

    const fixture = {
      _id: new mongo.ObjectID(),
      name: 'test-temperature-check',
      type: 'temperature',
      breadcrumbs: [
        {
          name: 'test-text-test-exsting-parent',
          entityId: new mongo.ObjectID()
        }
      ],
      temperature: {
        followUpCheckEntityId: new mongo.ObjectID(),
        timeDelayedCheckEntityId: new mongo.ObjectID(),
      },
      version: Date.now(),
      customerId: 'old-customer-id'
    };

    const result = singleImport.copyCheck(fixture, null, newCustomerId);

    assert.notEqual(result._id, fixture._id);
    assert.equal(result.name, fixture.name);
    assert.equal(result.customerId, newCustomerId);
    assert.deepEqual(result.breadcrumbs, []);
  })

  it('should get children of a check', () => {

  });
});