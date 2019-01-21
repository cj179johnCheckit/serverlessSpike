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

  const newCustomerId = 'test-customer-id';
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
      importService = new ImportService(mongoServiceStub, newCustomerId);
    });

    afterEach(() => sandbox.restore());

    it('should import check lists of a template', async() => {
      sandbox.stub(mongoServiceStub, 'find').resolves(
        [
          { type: 'temperature' },
          { type: 'checklist'},
          { type: 'opitonsList'},
        ]
      );
      sandbox.stub(importService, 'importCheck').returns({});

      const testTemplateId = new mongo.ObjectID();
      const results = await importService.importTemplateChecklists(testTemplateId);

      assert.equal(3, results.length); //importCheck called 3 times
    });

    it('should import schedules of a template', async() => {
      sandbox.stub(mongoServiceStub, 'find').resolves([
        {
          _id: new mongo.ObjectID(),
          name: 'test-schedule',
          dateFrequency: {
            weekly: {
              monday: true,
              tuesday: true,
              wednesday: true,
              thurseday: true,
              friday: true,
              saturday: true,
              sunday: true
            }
          },
          timeFrequency: {
            times: [0]
          },
          _version: 1544538580302,
          customerId: 'm23xg'
        }
      ]);

      const insertStub = sandbox.stub(mongoServiceStub, 'insert');
      await importService.importTemplateSchedules('m23xg');
      assert.equal(insertStub.getCall(0).args[1][0].customerId, newCustomerId);
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
      checkClone.customerId = newCustomerId;

      const childCheckClone = cloneDeep(childCheck);
      childCheckClone._id = new mongo.ObjectID();
      childCheckClone.version = 1548079270480;
      childCheckClone.customerId = newCustomerId;

      const copyCheckStub = sandbox.stub(SingleImport.prototype, 'copyCheck');

      copyCheckStub.onCall(0).returns(checkClone);
      copyCheckStub.onCall(1).returns(childCheckClone);

      const updateStub = sandbox.stub(SingleImport.prototype, 'updateCheckParent').resolves(true);

      const ImportServiceMock = proxyquire('../services/import', {
        'SingleImport': SingleImport
      });

      importService = new ImportServiceMock.ImportService(mongoServiceStub);

      const findOneStub = sandbox.stub(mongoServiceStub, 'findOne').resolves(childCheck);
      const insertStub = sandbox.stub(mongoServiceStub, 'insert').resolves(true);

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