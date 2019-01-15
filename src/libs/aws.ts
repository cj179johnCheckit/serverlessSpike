import { get } from 'lodash';
import { config, SQS } from 'aws-sdk';
import { Message, MessageBody, MessagePayload } from './interfaces';

config.update({region: 'eu-west-1'});

class CustomerMessage implements MessagePayload {
  messageFilter: '';
  customerId: '';
  customerTemplateId: '';
}

// interface Response {
//   Messages: Message[]
// }

const defaultMessage = new CustomerMessage();

export class AWSLib {
  private sqs: SQS;
  private utils: any;

  constructor(utils: any = {}) {
    this.utils = utils;
    this.sqs = new SQS({apiVersion: '2012-11-05'});
  }

  getQueueUrl(queueName: string) {
    return new Promise<string>((resolve, reject) =>
      this.sqs.getQueueUrl(
        {
          QueueName: queueName
        },
        (err, data) =>
          err ? reject(err) : resolve(data.QueueUrl)
      )
    );
  }

  getMessage(queueUrl: string) {
    return new Promise<MessagePayload>((resolve, reject) => this.sqs.receiveMessage(
      {
        QueueUrl: queueUrl
      },
      async (error, response) => {
        if (error) {
          reject(error);
        }

        const message = get(response, 'Messages[0]', {});

        if (!this.utils.validateMessage(message)) {
          console.log('No valid message recieved');
          return resolve(defaultMessage);
        }
        const messageBody: MessageBody = JSON.parse(message.Body);
        await this.deleteMessage(queueUrl, message.ReceiptHandle);
        resolve(JSON.parse(messageBody.Message));
      }));
  }
  deleteMessage(queueUrl: string, handle: any) {
    return new Promise((resolve, reject) => this.sqs.deleteMessage(
      {
        QueueUrl: queueUrl,
        ReceiptHandle: handle
      },
      (err: Error, response) => err ? reject(err) : resolve(response)
    ));
  }
};