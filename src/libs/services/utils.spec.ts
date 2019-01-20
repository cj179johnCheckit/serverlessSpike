import { Utils } from './utils';
import 'mocha';
import { assert } from 'chai';
import { BootstrapConfig } from '../interfaces';
import { config } from 'aws-sdk';

describe('Utils service', () => {
  let utils: Utils;
  let configs: BootstrapConfig;

  beforeEach(() => utils = new Utils());

  it('should validate message from queue', () => {
    const validMessage = {
      Body: 'messageBody',
      ReceiptHandle: 'RecepitHandle'
    };

    const inValidMessage = {
      ReceiptHandle: 'RecepitHandle'
    };

    assert.isTrue(utils.validateMessage(validMessage));
    assert.isFalse(utils.validateMessage(inValidMessage));
  });

  it('should get env vars from configs', () => {
    const configs = [
      {
        Name: 'CHECKITDB_URI',
        Value: 'mongo://localhost:27017/checkit'
      }
    ];

    const result = utils.getEnvVarsFromConfigs('CHECKITDB_URI', configs);
    assert.equal('mongo://localhost:27017/checkit', result);
  });
});