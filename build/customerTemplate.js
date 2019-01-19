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
const bootstrap_1 = require("./libs/bootstrap");
const config_1 = require("./libs/config");
const database_1 = require("./libs/database");
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
            const dbService = new database_1.DatabaseService(dbConnection);
            // const templateMeta = await dbService.findCustomerTemplate('m23xg');
            const templateChecklists = yield dbService.findTemplateChecklists('m23xg');
            console.log(JSON.stringify(templateChecklists));
            // const templateSchedules = await dbService.findTemplateSchedules('m23xg');
            // return callback(null, templateId);
        }
        catch (error) {
            return callback(error);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJUZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdXN0b21lclRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQ0FBb0M7QUFDcEMsd0NBQXFDO0FBQ3JDLGdEQUE2QztBQUM3QywwQ0FBdUM7QUFDdkMsOENBQWtEO0FBRWxELE1BQU0sS0FBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7QUFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDO0FBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFZixRQUFBLE1BQU0sR0FBRyxVQUFnQixRQUFhLEVBQUUsRUFBRSxVQUFlLEVBQUUsRUFBRSxRQUFrQjs7UUFFMUYsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUM7WUFDOUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUV0QyxJQUFJLFdBQVcsS0FBSyxPQUFPLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQ2pDO1lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxTQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sU0FBUyxHQUFHLElBQUksMEJBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVwRCxzRUFBc0U7WUFFdEUsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUzRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ2hELDRFQUE0RTtZQUM1RSxxQ0FBcUM7U0FDdEM7UUFBQyxPQUFNLEtBQUssRUFBRTtZQUNiLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUFBLENBQUMifQ==