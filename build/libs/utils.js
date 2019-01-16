"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    validateMessage(message = {}) {
        return ['Body', 'ReceiptHandle'].every(key => Object.keys(message).indexOf(key) > -1);
    }
    getEnvVarsFromConfigs(name, configs) {
        return configs.find(config => config.Name === name).Value;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQWEsS0FBSztJQUNoQixlQUFlLENBQUMsVUFBZSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHFCQUFxQixDQUFDLElBQVksRUFBRSxPQUEyQjtRQUM3RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUFURCxzQkFTQyJ9