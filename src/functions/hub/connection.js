const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const iot = new AWS.Iot({apiVersion: '2015-05-28'});
const cloudWatchEvents = new AWS.CloudWatchEvents({apiVersion: '2015-10-07'});

exports.handler = async (event) => {
  console.log(event);

  const serialNumberRegex = /^(?:\d{4}-){3}\d{4}$/;

  const {eventType, clientId, timestamp} = event;

  if (!serialNumberRegex.test(clientId)) {
    return;
  }

  const thing = await iot.describeThing({thingName: clientId}).promise();

  const {environment} = thing.attributes;

  let online;

  if (eventType === 'connected') {
    online = true;
  } else if (eventType === 'disconnected') {
    online = false;
  } else {
    // This is some other event we don't care about
    return;
  }

  try {
    await dynamoDb.updateItem({
      TableName: 'hub-connections',
      Key: {
        Environment: {
          S: environment
        },
        SerialNumber: {
          S: clientId
        }
      },
      UpdateExpression: 'SET #F = :t',
      ExpressionAttributeNames: {
        "#F": online ? 'LastConnection' : 'LastDisconnection'
      },
      ExpressionAttributeValues: {
        ":t": {
          N: `${timestamp}`
        }
      },
      ConditionExpression: '#F <= :t OR attribute_not_exists(#F)'
    }).promise()
  } catch(e) {
    if (e.name !== 'ConditionalCheckFailedException') {
      throw e;
    }
  }

  try {
    await dynamoDb.updateItem({
      TableName: 'hub-connections',
      Key: {
        Environment: {
          S: environment
        },
        SerialNumber: {
          S: clientId
        }
      },
      UpdateExpression: 'SET #O = :o',
      ExpressionAttributeNames: {
        "#F": online ? 'LastConnection' : 'LastDisconnection',
        "#G": online ? 'LastDisconnection' : 'LastConnection',
        '#O': 'Online'
      },
      ExpressionAttributeValues: {
        ":t": {
          N: `${timestamp}`
        },
        ":o": {
          BOOL: online
        }
      },
      ConditionExpression: '#F <= :t AND (#G < :t OR attribute_not_exists(#G))'
    }).promise();
  } catch(e) {
    if (e.name !== 'ConditionalCheckFailedException') {
      throw e;
    }
  }

  let interval = 20;
  if (clientId === '1234-1234-1234-8888') {
    interval = 40;
  }

  return {online, hubId: clientId, interval};
};
