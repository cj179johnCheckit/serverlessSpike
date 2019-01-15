"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    validateMessage(message = {}) {
        return ['Body', 'ReceiptHandle'].every(key => Object.keys(message).indexOf(key) > -1);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsS0FBSztJQUNoQixlQUFlLENBQUMsVUFBZSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBTEQsc0JBS0MifQ==