const AWSLib = require('./libs/aws');

const awsLib = new AWSLib();

exports.create = async function(event, context, callback) {
  try {
    const queueUrl = await awsLib.getQueueUrl('checkit-customer-template-test');
    const message = await awsLib.getMessage(queueUrl);
    const templateId = message.customerTemplateId;
    return callback(null, templateId);
  } catch(error) {
    return callback(error);
  }
};