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
;
class DatabaseService {
    constructor(dbConnection) {
        this.service = new mongo_1.MongoService(dbConnection);
        this.count = 0;
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
            this.service.setCollection('check');
            const checksToDuplicate = yield this.service.find({ customerId: templateId, isRoot: true });
            checksToDuplicate.map((check) => __awaiter(this, void 0, void 0, function* () {
                yield this.importCheck(check, null);
            }));
        });
    }
    importCheck(source, parentCheck) {
        return __awaiter(this, void 0, void 0, function* () {
            this.count++;
            const sourceClone = lodash_1.cloneDeep(source);
            const entityId = this.service.createId();
            const version = Date.now();
            const breadcrumbs = parentCheck !== null ? parentCheck.breadcrumbs : [];
            const breadcrumbId = { name: source.name, entityId: source._id };
            breadcrumbs.push(breadcrumbId);
            const newCheck = Object.assign(sourceClone, {
                _id: entityId,
                version,
                customerId: 'test-id',
                breadcrumbs
            });
            switch (newCheck.type) {
                case 'checklist':
                    source.checklist.checklistItems.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                        const itemData = yield this.service.findOne({ _id: item.checkEntityId });
                        if (itemData) {
                            newCheck.checklist.checklistItems[index].checkEntityId = yield this.importCheck(itemData, newCheck)._id;
                        }
                    }));
                    break;
                // case 'optionsList':
                //   source.optionsList.options.map(async (option: any) => {
                //     if (option.followUpCheck) {
                //       option.followUpCheck = await this.importCheck(option.followUpCheck, newCheck);
                //     }
                //     if (option.timeDelayedCheck) {
                //       option.timeDelayedCheck = await this.importCheck(option.timeDelayedCheck, newCheck);
                //     }
                //   });
                // break;
                // case 'temperature':
                // case 'text':
                // case 'acknowledgement':
                // case 'dateEntry':
                //   if (source.followUpCheck) {
                //     source.followUpCheckEntityId = this.importCheck(source.followUpCheck, newCheck);
                //   }
                //   if (source.timeDelayedCheck) {
                //     source.timeDelayedCheck = this.importCheck(source.timeDelayedCheck, newCheck);
                //   }
                // break;
            }
            yield this.service.insert([newCheck]);
            return newCheck;
        });
    }
    findTemplateSchedules(templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.service.setCollection('schedule');
            return yield this.service.find({ customerId: templateId });
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQXVDO0FBQ3ZDLG1DQUF3QztBQU12QyxDQUFDO0FBRUYsTUFBYSxlQUFlO0lBRzFCLFlBQVksWUFBaUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVLLG9CQUFvQixDQUFDLFVBQWtCOztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDNUQsT0FBTyxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFSyxzQkFBc0IsQ0FBQyxVQUFrQixFQUFFLGFBQXFCLFNBQVM7O1lBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXBDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFNUYsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBVSxFQUFFLEVBQUU7Z0JBQ3pDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUNLLFdBQVcsQ0FBQyxN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