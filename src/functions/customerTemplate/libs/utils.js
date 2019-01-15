exports.validateMessageBody = (messageBody = {}) =>
  ['Body', 'ReceiptHandle'].every(
    key => Object.keys(messageBody).includes(key));