import { AWSLib } from './libs/aws';
import { Utils } from './libs/utils';
import { Bootstrap } from './libs/bootstrap';
import { Config } from './libs/config';

const utils = new Utils();
const awsLib = new AWSLib(utils);
const bootstrap = new Bootstrap(utils);
const environment = process.env['CHECKIT_ENV'] || 'local';
const config = new Config();

export const create = async function (event: any = {}, context: any = {}, callback: Function): Promise<any> {

  try {
    const queueUrl = await awsLib.getQueueUrl('checkit-customer-template-test');
    const message = await awsLib.getMessage(queueUrl);
    const templateId = message.customerTemplateId;
    const customerId = message.customerId;

    if (environment === 'local') {
      config.setLocalConfigurations();
    }

    const dbConnection = await bootstrap.getConnection(environment);

    console.log(dbConnection);

    return callback(null, templateId);
  } catch(error) {
    return callback(error);
  }
};