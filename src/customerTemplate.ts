import { AWSLib } from './libs/aws';
import { Utils } from './libs/utils';

const utils = new Utils();
const awsLib = new AWSLib(utils);

export const create = async function (event: any = {}, context: any = {}, callback: Function): Promise<any> {
  try {
    const queueUrl = await awsLib.getQueueUrl('checkit-customer-template-test');
    const message = await awsLib.getMessage(queueUrl);
    const templateId = message.customerTemplateId;
    const custoemrId = message.customerId;
    return callback(null, templateId);
  } catch(error) {
    return callback(error);
  }
};