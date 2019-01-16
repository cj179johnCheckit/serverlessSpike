import { ConfigMapping as BootstrapConfigMapping } from '@checkit/checkit-application-bootstrapper';
import { Connection } from 'typeorm';
export declare class Bootstrap {
    private connection;
    private utils;
    constructor(utils: any);
    getConfigMapping(environment: string): BootstrapConfigMapping;
    getDBConnection(environmentName: string): Promise<Connection>;
}
