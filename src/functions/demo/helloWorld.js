exports.greet = (event, context, callback) => {
  console.log('Hello World');
  callback(null, {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({message: 'Hello World!'})
  });
};