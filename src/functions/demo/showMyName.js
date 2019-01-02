const { get } = require('lodash');

exports.show = (event, context, callback) => {
  const myName = {
    name: 'Checkit Limited'
  };
  const nameString = get(myName, 'name');

  console.log(`My name is ${nameString}`);

  callback();
};