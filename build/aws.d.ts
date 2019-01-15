declare class AWSLib {
    private sqs;
    private utils;
    constructor(utils: any);
    getQueueUrl(queueName: string): Promise<{}>;
    getMessage(queueUrl: string): Promise<{}>;
    deleteMessage(queueUrl: string, handle: any): Promise<{}>;
}
export = AWSLib;
