import { mappings as localConfig } from '../config/local';

export class Config {
  setLocalConfigurations(): Config {
    console.log(localConfig);

    Object.keys(localConfig).forEach((prop) => process.env[prop] = localConfig[prop]);
    return this;
  }
}
