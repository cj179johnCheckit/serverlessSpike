import { ImportService } from './import';
import 'mocha';
import { assert } from 'chai';
import * as Sinon from 'ts-sinon';
import { MongoService } from './mongo';
import { SingleImport } from './singleImport';
import { SingleCheck, BreadcrumbId } from '../interfaces/check';
import { cloneDeep } from 'lodash';

const proxyquire = require('proxyquire');
const mongo = require('mongodb');
const sinon = Sinon.default;

describe('Import template service', () => {

  const customerId = 'test-customer-id';
  let importService: ImportService;
  let dbConnectionStub: {};
  let sandbox: Sinon.default.SinonSandbox;
  let mongoServiceStub: MongoService;

  describe('Import data', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      dbConnectionStub = {
        db: sandbox.stub()
      };
      mongoServiceStub = new MongoService(dbConnectionStub);
      importService = new ImportService(mongoServiceStub, customerId);
    });

    afterEach(() => sandbox.restore());

    it('should import template check lists', (done) => {
      sandbox.stub(mongoServiceStub, 'find').resolves(
        [
          { type: 'temperature' },
          { type: 'checklist'},
          { type: 'opitonsList'},
        ]
      );
      sandbox.stub(importService, 'importCheck').returns({});

      const testTemplateId = new mongo.ObjectID();
      const resultPromise = importService.importTemplateChecklists(testTemplateId);

      resultPromise.then((results) => {
        assert.equal(3, results.length); //importCheck called 3 times
        done();
      });
    });
  });


  describe('import individual check', () => {
    it('should import individual check recursively', async () => {

      const childCheckId = new mongo.ObjectID();

      const check: SingleCheck = {
        _id: new mongo.ObjectID(),
        name: 'true - Delayed Check',
        type: 'acknowledgement',
        acknowledgement: {
          followUpCheckEntityId: childCheckId,
          timeDelayedCheckEntityId: null
        },
        breadcrumbs: <BreadcrumbId[]> [],
        customerId: '11zgq',
        version: 1547244589631.0
    };

      const childCheck: SingleCheck = {
        _id: childCheckId,
        name: 'Check front door',
        type: 'acknowledgement',
        acknowledgement : {
          followUpCheckEntityId: null,
          timeDelayedCheckEntityId: null
        },
        breadcrumbs: [
          {
            name: 'true - Delayed Check',
            entityId: check._id
          }
        ],
        customerId: '11zgq',
        version: 1547244589628.0
      };

      const checkClone = cloneDeep(check);
      checkClone._id = new mongo.ObjectID();
      checkClone.version = 1548079270464;
      checkClone.customerId = customerId;

      const childCheckClone = cloneDeep(childCheck);
      childCheckClone._id = new mongo.ObjectID();
      childCheckClone.version = 1548079270480;
      childCheckClone.customerId = customerId;

      const copyCheckStub = sinon.stub(SingleImport.prototype, 'copyCheck');

      copyCheckStub.onCall(0).returns(checkClone);
      copyCheckStub.onCall(1).returns(childCheckClone);

      const updateStub = sinon.stub(SingleImport.prototype, 'updateCheckParent').resolves(true);

      const ImportServiceMock = proxyquire('../services/import', {
        'SingleImport': SingleImport
      });

      importService = new ImportServiceMock.ImportService(mongoServiceStub);

      const findOneStub = sinon.stub(mongoServiceStub, 'findOne').resolves(childCheck);
      const insertStub = sinon.stub(mongoServiceStub, 'insert').resolves(true);

      await importService.importCheck(check, null);

      assert.deepEqual(findOneStub.getCall(0).args, ['check', { _id: childCheck._id }]);
      assert.deepEqual(insertStub.getCall(0).args, ['check', [checkClone]]);
      assert.deepEqual(updateStub.getCall(0).args, [ checkClone, childCheckClone._id, childCheck._id]);

      childCheckClone.breadcrumbs = [
        {
          name: 'true - Delayed Check',
          entityId: checkClone._id
        }
      ];
      assert.deepEqual(insertStub.getCall(1).args, ['check', [childCheckClone]]);
    });
  });


});