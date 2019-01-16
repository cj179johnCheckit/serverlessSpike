"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_1 = require("../config/local");
class Config {
    setLocalConfigurations() {
        console.log(local_1.mappings);
        Object.keys(local_1.mappings).forEach((prop) => process.env[prop] = local_1.mappings[prop]);
        return this;
    }
}
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBEO0FBRTFELE1BQWEsTUFBTTtJQUNqQixzQkFBc0I7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBVyxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQVBELHdCQU9DIn0=