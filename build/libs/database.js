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
const lodash_get_1 = require("lodash.get");
class DatabaseService {
    constructor(dbConnection) {
        this.service = new mongo_1.MongoService(dbConnection);
    }
    findCustomerTemplate(templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.service.setCollection('customer');
                const results = yield this.service.find({ _id: templateId });
                return lodash_get_1.get(results, '[0]', {});
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQXVDO0FBQ3ZDLDJDQUFpQztBQUVqQyxNQUFhLGVBQWU7SUFHMUIsWUFBWSxZQUFpQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUssb0JBQW9CLENBQUMsVUFBa0I7O1lBQzNDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDNUQsT0FBTyxnQkFBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDaEM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCO1FBRUgsQ0FBQztLQUFBO0NBQ0Y7QUFqQkQsMENBaUJDIn0=