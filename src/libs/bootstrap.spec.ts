import { Bootstrap } from './bootstrap';
import 'mocha';
import { assert } from 'chai';
import * as Sinon from 'ts-sinon';

const proxyquire = require('proxyquire');
const sinon = Sinon.default;

export interface UtilsMock {
  getEnvVarsFromConfig: sinon.SinonStub;
}

export interface BootstrapperMock {
  bootstrap: sinon.SinonStub;
}

export interface MongoMock {
  MongoClient: {
    connect: sinon.SinonStub;
  };
}

describe('boostrap the environment', () => {
  let bootstrap: Bootstrap;
  let utilsMock: UtilsMock;
  let sandbox: sinon.SinonSandbox;
  let bootstrapperMock: BootstrapperMock;
  let mongoMock: MongoMock;

  const checkitdbUrl = 'mongodb://localhost:27017/checkit';

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    utilsMock = {
      getEnvVarsFromConfig: sandbox.stub()
    };

    bootstrapperMock = {
      bootstrap: sandbox.stub().resolves([{
        CHECKITDB_URI: checkitdbUrl
      }])
    };

    mongoMock = {
      MongoClient: {
        connect: sandbox.stub()
      }
    };

    const bootstrapMock = proxyquire('./bootstrap.ts', {
      '@checkit/checkit-application-bootstrapper': bootstrapperMock,
      'mongodb': mongoMock
    });

    bootstrap = new bootstrapMock.Bootstrap(utilsMock);
  });

  afterEach(() => sandbox.restore());

  it('should get database connection', async () => {
    const env = 'local/test';
    utilsMock.getEnvVarsFromConfig.returns(checkitdbUrl);

    await bootstrap.getDBConnection(env);

    assert.equal(checkitdbUrl, mongoMock.MongoClient.connect.getCall(0).args[0]);
  });
});