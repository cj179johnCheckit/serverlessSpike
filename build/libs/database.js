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
            console.log(source.name);
            switch (source.type) {
                case 'checklist':
                    source.checklist.checklistItems.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                        const itemData = yield this.service.findOne({ _id: item.checkEntityId });
                        this.importCheck(itemData, source);
                    }));
                    break;
                case 'optionsList':
                    source.optionsList.options.map((option, index) => __awaiter(this, void 0, void 0, function* () {
                        if (option.followUpCheckEntityId) {
                            const followUpData = yield this.service.findOne({ _id: option.followUpCheckEntityId });
                            this.importCheck(followUpData, source);
                        }
                        if (option.timeDelayedCheckEntityId) {
                            const timeDelayData = yield this.service.findOne({ _id: option.timeDelayedCheckEntityId });
                            this.importCheck(timeDelayData, source);
                        }
                    }));
                    break;
                case 'temperature':
                case 'text':
                case 'acknowledgement':
                case 'dateEntry':
                    if (source[source.type].followUpCheckEntityId) {
                        const followUpData = yield this.service.findOne({ _id: source[source.type].followUpCheckEntityId });
                        this.importCheck(followUpData, source);
                    }
                    if (source[source.type].timeDelayedCheckEntityId) {
                        const timeDelayedData = yield this.service.findOne({ _id: source[source.type].timeDelayedCheckEntityId });
                        this.importCheck(timeDelayedData, source);
                    }
                    break;
            }
        });
    }
    importCheckbad(source, parentCheck) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            const newData = yield this.importCheck(itemData, newCheck);
                            newCheck.checklist.checklistItems[index].checkEntityId = newData._id;
                        }
                    }));
                    break;
                case 'optionsList':
                    source.optionsList.options.map((option, index) => __awaiter(this, void 0, void 0, function* () {
                        if (option.followUpCheck) {
                            const optionData = yield this.service.findOne({ _id: option.followUpCheck });
                            if (optionData) {
                                source.optionsList.options[index].followUpCheck.entityId = yield this.importCheck(optionData, newCheck);
                            }
                        }
                        if (option.timeDelayedCheck) {
                            const optionData = yield this.service.findOne({ _id: option.timeDelayedCheck });
                            if (optionData) {
                                source.optionsList.options[index].timeDelayedCheck.entityId = yield this.importCheck(optionData, newCheck);
                            }
                        }
                    }));
                    break;
                case 'temperature':
                case 'text':
                case 'acknowledgement':
                case 'dateEntry':
                    if (source.followUpCheck) {
                        const followUpCheckData = yield this.service.findOne({ _id: source.followUpCheck });
                        if (followUpCheckData) {
                            source.followUpCheckEntityId = yield this.importCheck(followUpCheckData, newCheck);
                        }
                    }
                    if (source.timeDelayedCheck) {
                        const timeDelayedCheckData = yield this.service.findOne({ _id: source.timeDelayedCheck });
                        if (timeDelayedCheckData) {
                            source.timeDelayedCheck.entityId = yield this.importCheck(timeDelayedCheckData, newCheck);
                        }
                    }
                    break;
            }
            // await this.service.insert([newCheck]);
            console.log(newCheck.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQXVDO0FBQ3ZDLG1DQUF3QztBQU12QyxDQUFDO0FBRUYsTUFBYSxlQUFlO0lBRzFCLFlBQVksWUFBaUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVLLG9CQUFvQixDQUFDLFVBQWtCOztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDNUQsT0FBTyxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFSyxzQkFBc0IsQ0FBQyxVQUFrQixFQUFFLGFBQXFCLFNBQVM7O1lBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXBDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFNUYsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBVSxFQUFFLEVBQUU7Z0JBQ3pDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxNQUFXLEVBQUUsV0FBZTs7WUFFNUMsT0FBTyxDQUFDLEdBQUcs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