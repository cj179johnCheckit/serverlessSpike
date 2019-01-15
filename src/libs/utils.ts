export class Utils {
  validateMessage(message: any = {}): boolean {
    return ['Body', 'ReceiptHandle'].every(
      key => Object.keys(message).indexOf(key) > -1);
  }
}
