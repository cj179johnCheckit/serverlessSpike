import { ImportService } from './import';
import 'mocha';
import { assert } from 'chai';
// import * as sinon from 'sinon';
import * as Sinon from 'ts-sinon';
import { MongoService, MongoServiceInterface } from './mongo';

const mongo = require('mongodb');
const sinon = Sinon.default;

describe('Import template service', () => {

  let importService: ImportService;
  let dbConnectionStub: {};
  let sandbox: Sinon.default.SinonSandbox;
  let mongoServiceStub: MongoService;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dbConnectionStub = {
      db: sandbox.stub()
    };
  });

  afterEach(() => sandbox.restore());

  it('should import template check lists', (done) => {
    MongoService.prototype.find = sandbox.stub().returns(Promise.resolve([
      { type: 'temperature' },
      { type: 'checklist'},
      { type: 'opitonsList'},
  ]));

    mongoServiceStub = new MongoService(dbConnectionStub);

    ImportService.prototype.importCheck = sandbox.stub().returns({});

    importService = new ImportService(mongoServiceStub);

    const testTemplateId = new mongo.ObjectID();
    const resultPromise = importService.importTemplateChecklists(testTemplateId, 'test-customer-id');

    resultPromise.then((results) => {
      assert.equal(3, results.length); //importCheck called 3 times
      done();
    });

  });
});