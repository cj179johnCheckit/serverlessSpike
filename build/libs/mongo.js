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
class MongoService {
    constructor(dbConnection) {
        this.db = dbConnection.db();
    }
    setCollection(collectionName) {
        this.collection = this.db.collection(collectionName);
        return this;
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
}
exports.MongoService = MongoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9tb25nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsTUFBYSxZQUFZO0lBSXZCLFlBQVksWUFBaUI7UUFDM0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxjQUFzQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFXO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFVLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FDN0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNLLFNBQVMsQ0FBQyxNQUFXLEVBQUUsUUFBYTs7WUFDeEMsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUNwQyxNQUFNLEVBQ04sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQ25CLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQTFCRCxvQ0EwQkMifQ==