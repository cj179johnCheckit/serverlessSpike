import { bootstrap, EnvironmentVariable } from '@checkit/checkit-application-bootstrapper';
import { ConfigMapping } from '@checkit/checkit-application-bootstrapper';
const MongoClient = require('mongodb').MongoClient;
import {
  Connection,
  ConnectionOptions,
  ConnectionOptionsReader,
  createConnection,
  getConnection,
  getConnectionManager
} from 'typeorm';

const applicationName = 'customer-template-lambda';

export class Bootstrap {
  private connection: Connection;

  getConfigMapping(environment: string): ConfigMapping {
    return {
      applicationName,
      environment,
      mapping: [
        `/${environment}/common/CHECKITDB_URI`
      ]
    };
  }
  async getConnection(environmentName: string = 'LOCAL'): Promise<Connection> {
    const configMapping = this.getConfigMapping(environmentName);
    const environment = await bootstrap(configMapping);
    console.log(environment);

    if (!this.connection) {
      this.connection = await MongoClient.connect();
    }
    return this.connection;
  }
}


