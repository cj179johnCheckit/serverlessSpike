const { get } = require('lodash');
const Response = require('../shared/classes/Response');
const response = new Response();

exports.show = (event, context, callback) => {
  const nameString = get(event, 'name');
  console.log(event.queryStringParameters);
  response.setBody(JSON.stringify({message: `My name is ${nameString}`}));
  callback(null, response.getResponse());
};