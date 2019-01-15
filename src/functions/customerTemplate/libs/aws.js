const AWS = require('aws-sdk');
const lodashGet = require('lodash.get');

AWS.config.update({region: 'eu-west-1'});

class AWSLib {
  constructor(utils) {
    this.utils = utils;
    this.sqs = new AWS.SQS({ sqs: '2012-11-05'});
  }

  getQueueUrl(queueName) {
    return new Promise((resolve, reject) =>
      this.sqs.getQueueUrl(
        {
          QueueName: queueName
        },
        (err, data) =>
          err ? reject(err) : resolve(data.QueueUrl)
      )
    );
  }

  getMessage(queueUrl) {
    return new Promise((resolve, reject) => this.sqs.receiveMessage(
      {
        QueueUrl: queueUrl
      },
      async (error, response) => {
        if (error) {
          reject(error);
        }

        const message = lodashGet(response, 'Messages[0]', false);

        if (!this.utils.validateMessageBody(message)) {
          console.log('No valid message recieved');
          return resolve({});
        }

        const messageBody = JSON.parse(message.Body);
        await this.deleteMessage(queueUrl, message.ReceiptHandle);
        resolve(JSON.parse(messageBody.Message));
      }));
  }
  deleteMessage(queueUrl, handle) {
    return new Promise((resolve, reject) => this.sqs.deleteMessage(
      {
        QueueUrl: queueUrl,
        ReceiptHandle: handle
      },
      (err, response) => err ? reject(err) : resolve(response)
    ));
  }
};

module.exports = AWSLib;