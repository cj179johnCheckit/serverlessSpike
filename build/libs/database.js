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
const mongo_1 = require("./mongo");
const lodash_1 = require("lodash");
const CheckStrategy_1 = require("./checks/CheckStrategy");
class DatabaseService {
    constructor(dbConnection) {
        this.service = new mongo_1.MongoService(dbConnection);
    }
    findCustomerTemplate(templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.setCollection('customer');
            const results = yield this.service.find({ _id: templateId });
            return lodash_1.get(results, '[0]', {});
        });
    }
    findTemplateChecklists(templateId, customerId = 'test-id') {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('STARTING');
            this.service.setCollection('check');
            const checksToDuplicate = yield this.service.find({ customerId: templateId, isRoot: true });
            return Promise.all(checksToDuplicate.map((check) => __awaiter(this, void 0, void 0, function* () { return yield this.importCheck(check, null, null); })));
        });
    }
    findTemplateSchedules(templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.setCollection('schedule');
            return yield this.service.find({ customerId: templateId });
        });
    }
    importCheck(source, parent = null, newParent = null) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(source.name);
            const proimses = [];
            const sourceClone = lodash_1.cloneDeep(source);
            const entityId = this.service.createId();
            const version = Date.now();
            const breadcrumbs = parent !== null ? parent.breadcrumbs : [];
            const breadcrumbId = { name: source.name, entityId: source._id };
            breadcrumbs.push(breadcrumbId);
            const newCheck = Object.assign(sourceClone, {
                _id: entityId,
                version,
                customerId: 'test-id',
                breadcrumbs
            });
            const sourceStrategy = new CheckStrategy_1.CheckStrategy().getStrategy(source.type);
            const children = sourceStrategy.getChildren(source);
            if (newParent) {
                const parentStrategy = new CheckStrategy_1.CheckStrategy().getStrategy(newParent.type);
                if (parentStrategy.needsUpdateChildLink(newParent)) {
                    const updatedNewParent = parentStrategy.updateChildLink(newParent, entityId, source._id);
                }
            }
            return Promise.all(children.map((child) => __awaiter(this, void 0, void 0, function* () {
                const childDetails = yield this.service.findOne({ _id: child.id });
                return yield this.importCheck(childDetails, source, newCheck);
            })));
            // const updatedChildren = Promise.all(children.map(async child => await this.copy(child, source)))
            // update child references using updated children
            // const updatedCheck: Check = null;
            // return updatedCheck;
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQXVDO0FBQ3ZDLG1DQUF3QztBQUd4QywwREFBdUQ7QUFHdkQsTUFBYSxlQUFlO0lBRzFCLFlBQVksWUFBaUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVLLG9CQUFvQixDQUFDLFVBQWtCOztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDNUQsT0FBTyxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFSyxzQkFBc0IsQ0FBQyxVQUFrQixFQUFFLGFBQXFCLFNBQVM7O1lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFcEMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBWSxFQUFFLEVBQUUsZ0RBQzlELE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUMx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