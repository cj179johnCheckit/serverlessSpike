import { BootstrapConfig } from './interfaces';
export declare class Utils {
    validateMessage(message?: any): boolean;
    getEnvVarsFromConfigs(name: string, configs: BootstrapConfig[]): any;
}
