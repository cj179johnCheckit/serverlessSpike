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
const utils_1 = require("./libs/services/utils");
const bootstrap_1 = require("./libs/bootstrap");
const config_1 = require("./libs/config");
const import_1 = require("./libs/services/import");
const mongo_1 = require("./libs/services/mongo");
const utils = new utils_1.Utils();
const awsLib = new aws_1.AWSLib(utils);
const bootstrap = new bootstrap_1.Bootstrap(utils);
const environment = process.env['CHECKIT_ENV'] || 'local';
const config = new config_1.Config();
exports.create = function (event = {}, context = {}, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queueUrl = yield awsLib.getQueueUrl('checkit-customer-template-test');
            const message = yield awsLib.getMessage(queueUrl);
            const templateId = message.customerTemplateId;
            const customerId = message.customerId;
            if (environment === 'local') {
                config.setLocalConfigurations();
            }
            const dbConnection = yield bootstrap.getDBConnection(environment);
            const dbService = new mongo_1.MongoService(dbConnection);
            const importService = new import_1.ImportService(dbService);
            // const templateMeta = await importService.findCustomerTemplate('m23xg');
            yield importService.importTemplateChecklists('m23xg');
            // const templateSchedules = await dbService.findTemplateSchedules('m23xg');
            return callback(null, templateId);
        }
        catch (error) {
            return callback(error);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdXN0b21lclRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQ0FBb0M7QUFDcEMsaURBQThDO0FBQzlDLGdEQUE2QztBQUM3QywwQ0FBdUM7QUFDdkMsbURBQXVEO0FBQ3ZELGlEQUFxRDtBQUVyRCxNQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO0FBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUksWUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRWYsUUFBQSxNQUFNLEdBQUcsVUFBZ0IsUUFBYSxFQUFFLEVBQUUsVUFBZSxFQUFFLEVBQUUsUUFBa0I7O1FBRTFGLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM1RSxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFFdEMsSUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFO2dCQUMzQixNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUNqQztZQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVsRSxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFakQsTUFBTSxhQUFhLEdBQUcsSUFBSSxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRW5ELDBFQUEwRTtZQUUxRSxNQUFNLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV0RCw0RUFBNEU7WUFDNUUsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTSxLQUFLLEVBQUU7WUFDYixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FBQSxDQUFDIn0=