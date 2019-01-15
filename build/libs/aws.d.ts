import { MessagePayload } from './interfaces';
export declare class AWSLib {
    private sqs;
    private utils;
    constructor(utils?: any);
    getQueueUrl(queueName: string): Promise<string>;
    getMessage(queueUrl: string): Promise<MessagePayload>;
    deleteMessage(queueUrl: string, handle: any): Promise<{}>;
}
