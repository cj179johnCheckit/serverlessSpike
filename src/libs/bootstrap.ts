import { bootstrap } from '@checkit/checkit-application-bootstrapper';
import { ConfigMapping as BootstrapConfigMapping } from '@checkit/checkit-application-bootstrapper';
import { Connection } from 'typeorm';
import { BootstrapConfig } from './interfaces';

const MongoClient = require('mongodb').MongoClient;
const applicationName = 'customer-template-lambda';

export class Bootstrap {
  private connection: Connection;
  private utils: any;

  constructor(utils: any) {
    this.utils = utils;
  }

  getConfigMapping(environment: string): BootstrapConfigMapping {
    return {
      applicationName,
      environment,
      mapping: [
        `/${environment}/common/CHECKITDB_URI`
      ]
    };
  }

  async getConnection(environmentName: string): Promise<Connection> {
    const configMapping = this.getConfigMapping(environmentName);
    const configs: BootstrapConfig[] = await bootstrap(configMapping);

    const mongoURI = this.utils.getEnvVarsFromConfigs('CHECKITDB_URI', configs);

    if (!this.connection) {
      this.connection = await MongoClient.connect(mongoURI);
    }
    return this.connection;
  }
}


