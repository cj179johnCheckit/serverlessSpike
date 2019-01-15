"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const aws_sdk_1 = require("aws-sdk");
const get = require("lodash.get");
;
aws_sdk_1.config.update({ region: 'eu-west-1' });
class AWSLib {
    constructor(utils) {
        this.utils = utils;
        this.sqs = new aws_sdk_1.SQS({ apiVersion: '2012-11-05' });
    }
    getQueueUrl(queueName) {
        return new Promise((resolve, reject) => this.sqs.getQueueUrl({
            QueueName: queueName
        }, (err, data) => err ? reject(err) : resolve(data.QueueUrl)));
    }
    getMessage(queueUrl) {
        return new Promise((resolve, reject) => this.sqs.receiveMessage({
            QueueUrl: queueUrl
        }, (error, response) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                reject(error);
            }
            const message = get(response, 'Messages[0]', false);
            if (!this.utils.validateMessageBody(message)) {
                console.log('No valid message recieved');
                return resolve({});
            }
            const messageBody = JSON.parse(message.Body);
            yield this.deleteMessage(queueUrl, message.ReceiptHandle);
            resolve(JSON.parse(messageBody.Message));
        })));
    }
    deleteMessage(queueUrl, handle) {
        return new Promise((resolve, reject) => this.sqs.deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: handle
        }, (err, response) => err ? reject(err) : resolve(response)));
    }
}
;
module.exports = AWSLib;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYnMvYXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUFzQztBQUN0QyxrQ0FBbUM7QUFLbEMsQ0FBQztBQUVGLGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7QUFFckMsTUFBTSxNQUFNO0lBSVYsWUFBWSxLQUFVO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQWlCO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQ2xCO1lBQ0UsU0FBUyxFQUFFLFNBQVM7U0FDckIsRUFDRCxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUNaLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUM3QyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLFFBQWdCO1FBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FDN0Q7WUFDRSxRQUFRLEVBQUUsUUFBUTtTQUNuQixFQUNELENBQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3hCLElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNmO1lBRUQsTUFBTSxPQUFPLEdBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUNELGFBQWEsQ0FBQyxRQUFnQixFQUFFLE1BQVc7UUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUM1RDtZQUNFLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLEVBQ0QsQ0FBQyxHQUFVLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUNoRSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFBQSxDQUFDO0FBRUYsaUJBQVMsTUFBTSxDQUFBIn0=