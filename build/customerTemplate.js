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
const aws_1 = require("./libs/aws");
const utils_1 = require("./libs/utils");
const utils = new utils_1.Utils();
const awsLib = new aws_1.AWSLib(utils);
exports.create = function (event = {}, context = {}, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queueUrl = yield awsLib.getQueueUrl('checkit-customer-template-test');
            const message = yield awsLib.getMessage(queueUrl);
            const templateId = message.customerTemplateId;
            const custoemrId = message.customerId;
            return callback(null, templateId);
        }
        catch (error) {
            return callback(error);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdXN0b21lclRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQ0FBb0M7QUFDcEMsd0NBQXFDO0FBRXJDLE1BQU0sS0FBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7QUFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFcEIsUUFBQSxNQUFNLEdBQUcsVUFBZ0IsUUFBYSxFQUFFLEVBQUUsVUFBZSxFQUFFLEVBQUUsUUFBa0I7O1FBQzFGLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM1RSxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdEMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTSxLQUFLLEVBQUU7WUFDYixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FBQSxDQUFDIn0=