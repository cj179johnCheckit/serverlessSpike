import { AWSLib } from './libs/aws';
import { Utils } from './libs/utils';
import { Bootstrap } from './libs/bootstrap';
import { Config } from './libs/config';
import { DatabaseService } from './libs/database';

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

    const dbConnection = await bootstrap.getDBConnection(environment);

    const dbService = new DatabaseService(dbConnection);

    // const templateMeta = await dbService.findCustomerTemplate('m23xg');

    const templateChecklists = await dbService.findTemplateChecklists('m23xg');

    console.log(JSON.stringify(templateChecklists));
    // const templateSchedules = await dbService.findTemplateSchedules('m23xg');
    // return callback(null, templateId);
  } catch(error) {
    return callback(error);
  }
};