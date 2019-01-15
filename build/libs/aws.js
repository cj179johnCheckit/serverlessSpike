"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const aws_sdk_1 = require("aws-sdk");
aws_sdk_1.config.update({ region: 'eu-west-1' });
class CustomerMessage {
}
// interface Response {
//   Messages: Message[]
// }
const defaultMessage = new CustomerMessage();
class AWSLib {
    constructor(utils = {}) {
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
            const message = lodash_1.get(response, 'Messages[0]', {});
            if (!this.utils.validateMessage(message)) {
                console.log('No valid message recieved');
                return resolve(defaultMessage);
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
exports.AWSLib = AWSLib;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvYXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtQ0FBNkI7QUFDN0IscUNBQXNDO0FBR3RDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7QUFFckMsTUFBTSxlQUFlO0NBSXBCO0FBRUQsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixJQUFJO0FBRUosTUFBTSxjQUFjLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUU3QyxNQUFhLE1BQU07SUFJakIsWUFBWSxRQUFhLEVBQUU7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUI7UUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDbEI7WUFDRSxTQUFTLEVBQUUsU0FBUztTQUNyQixFQUNELENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQzdDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBZ0I7UUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FDN0U7WUFDRSxRQUFRLEVBQUUsUUFBUTtTQUNuQixFQUNELENBQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3hCLElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNmO1lBRUQsTUFBTSxPQUFPLEdBQUcsWUFBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsTUFBTSxXQUFXLEdBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDRCxhQUFhLENBQUMsUUFBZ0IsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FDNUQ7WUFDRSxRQUFRLEVBQUUsUUFBUTtZQUNsQixhQUFhLEVBQUUsTUFBTTtTQUN0QixFQUNELENBQUMsR0FBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDaEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkRELHdCQW1EQztBQUFBLENBQUMifQ==