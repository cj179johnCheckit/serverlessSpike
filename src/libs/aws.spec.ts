import { AWSLib } from './aws';
import 'mocha';
import { assert } from 'chai';
import * as Sinon from 'ts-sinon';
import { MessagePayload, MessageBody } from './interfaces/commons';
import * as AWS from 'aws-sdk';

const proxyquire = require('proxyquire');
const sinon = Sinon.default;

export interface UtilMock {
  validateMessage: sinon.SinonStub;
};

describe('AWS service', () => {

  let awsLib: AWSLib;
  let sandbox: sinon.SinonSandbox;
  let utils: UtilMock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    utils = {
      validateMessage: sandbox.stub()
    };
  });

  afterEach(() => sandbox.restore());

  it('should get message from queue', async() => {

    const payload: MessagePayload = {
      messageFilter: 'test',
      customerId: 'test-customer',
      customerTemplateId: 'test-template'
    };

    const messageBody: MessageBody = {
      Message: JSON.stringify(payload)
    };

    sandbox.stub(AWS.config, 'update').returns(true);
    sandbox.stub(AWS, 'SQS').returns({
      receiveMessage: (params: Object, callback:Function): Function =>
        callback(null, {
          Messages: [
            {
              Body: JSON.stringify(messageBody),
              ReceiptHandle: {}
            }
          ]
        }),
      deleteMessage: (params: Object, callback:Function): Function =>
        callback(null, true)
    });

    utils.validateMessage.returns(true);

    const AWSLibMock = proxyquire('./aws.ts', {
      'aws-sdk': AWS
    });

    awsLib = new AWSLibMock.AWSLib(utils);

    const result = await awsLib.getMessage('test-queue');

    assert.deepEqual(result, payload);
  });
});