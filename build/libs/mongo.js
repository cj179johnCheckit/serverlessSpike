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
const mongodb = require('mongodb');
class MongoService {
    constructor(dbConnection) {
        this.db = dbConnection.db();
    }
    setCollection(collectionName) {
        this.collection = this.db.collection(collectionName);
        return this;
    }
    findOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.find(params);
            return results.length > 0 ? results.shift() : null;
        });
    }
    find(params) {
        return new Promise((resolve, reject) => {
            this.collection.find(params).toArray((err, docs) => err ? reject(err) : resolve(docs));
        });
    }
    updateOne(params, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.updateOne(params, { $set: newValue });
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.insertMany(data);
        });
    }
    createId() {
        return new mongodb.ObjectID();
    }
}
exports.MongoService = MongoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9tb25nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLE1BQWEsWUFBWTtJQUl2QixZQUFZLFlBQWlCO1FBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxhQUFhLENBQUMsY0FBc0I7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFSyxPQUFPLENBQUMsTUFBVzs7WUFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JELENBQUM7S0FBQTtJQUNELElBQUksQ0FBQyxNQUFXO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFVLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FDN0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNLLFNBQVMsQ0FBQyxNQUFXLEVBQUUsUUFBYTs7WUFDeEMsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUNwQyxNQUFNLEVBQ04sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQ25CLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsSUFBYzs7WUFDekIsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVELFFBQVE7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQXRDRCxvQ0FzQ0MifQ==