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
const checkit_application_bootstrapper_1 = require("@checkit/checkit-application-bootstrapper");
const MongoClient = require('mongodb').MongoClient;
const applicationName = 'customer-template-lambda';
class Bootstrap {
    constructor(utils) {
        this.utils = utils;
    }
    getConfigMapping(environment) {
        return {
            applicationName,
            environment,
            mapping: [
                `/${environment}/common/CHECKITDB_URI`
            ]
        };
    }
    getConnection(environmentName) {
        return __awaiter(this, void 0, void 0, function* () {
            const configMapping = this.getConfigMapping(environmentName);
            const configs = yield checkit_application_bootstrapper_1.bootstrap(configMapping);
            const mongoURI = this.utils.getEnvVarsFromConfigs('CHECKITDB_URI', configs);
            if (!this.connection) {
                this.connection = yield MongoClient.connect(mongoURI);
            }
            return this.connection;
        });
    }
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxnR0FBc0U7QUFLdEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUNuRCxNQUFNLGVBQWUsR0FBRywwQkFBMEIsQ0FBQztBQUVuRCxNQUFhLFNBQVM7SUFJcEIsWUFBWSxLQUFVO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxXQUFtQjtRQUNsQyxPQUFPO1lBQ0wsZUFBZTtZQUNmLFdBQVc7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxXQUFXLHVCQUF1QjthQUN2QztTQUNGLENBQUM7SUFDSixDQUFDO0lBRUssYUFBYSxDQUFDLGVBQXVCOztZQUN6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0QsTUFBTSxPQUFPLEdBQXNCLE1BQU0sNENBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVsRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU1RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0Y7QUE3QkQsOEJBNkJDIn0=