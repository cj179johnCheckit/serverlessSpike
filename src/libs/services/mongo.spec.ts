import { MongoService } from './mongo';
import 'mocha';
import { assert } from 'chai';
import { cloneDeep } from 'lodash';
import * as Sinon from 'ts-sinon';
import { Check, BreadcrumbId } from '../interfaces/check';

const mongo = require('mongodb');
const sinon = Sinon.default;

export interface CollectionFucs {
  find: sinon.SinonStub;
  updateOne: sinon.SinonStub;
  insertMany: sinon.SinonStub;
}

export interface DBCollection {
  collection: () => CollectionFucs;
}

export interface DbConnection {
  db: () => DBCollection;
}

export interface MockMongoCursor {
  toArray: (callback: Function) => any;
}

describe('mongo database operation service', () => {
  let mongoService: MongoService;
  let dbConnectionStub: DbConnection;
  let sandbox: sinon.SinonSandbox;
  let fixtureCheck: Check;

  const insertResult = 'Inserted';
  const updateResult = 'Updated';

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixtureCheck = {
      _id: new mongo.ObjectID(),
      name: 'test-check',
      version: 123456789,
      customerId: 'test-customer-id',
      breadcrumbs: <BreadcrumbId[]>[],
      type: 'temperature'
    };

    const fixtureCursor: MockMongoCursor = {
      toArray: (callback: Function) =>
        callback(null, [fixtureCheck])
    };

    dbConnectionStub = {
      db: () => ({
        collection: () => ({
          find: sandbox.stub().returns(fixtureCursor),
          updateOne: sandbox.stub().returns(updateResult),
          insertMany: sandbox.stub().returns(insertResult)
        })
      })
    };

    mongoService = new MongoService(dbConnectionStub);
  });

  afterEach(() => sandbox.restore());

  it('should find one record', async() => {

    const results = await mongoService.findOne('check', {
      _id: 'test_id'
    });

    assert.deepEqual(results, fixtureCheck);
  });

  it('should update one record', async() => {
    const result = await mongoService.updateOne('check', { _id: 'test-id' }, fixtureCheck);
    assert.equal(result, updateResult);
  });

  it('should insert record', async() => {
    const result = await mongoService.insert('check', [fixtureCheck]);
    assert.equal(result, insertResult);
  });
});