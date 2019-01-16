import { BootstrapConfig } from './interfaces';

export class Utils {
  validateMessage(message: any = {}): boolean {
    return ['Body', 'ReceiptHandle'].every(
      key => Object.keys(message).indexOf(key) > -1);
  }

  getEnvVarsFromConfigs(name: string, configs: BootstrapConfig []) {
    return configs.find(config => config.Name === name).Value;
  }
}
