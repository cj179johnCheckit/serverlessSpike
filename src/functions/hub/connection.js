const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const tablePrefix = 'checkit-serverless-spike-resources-dev';

exports.handler = async (event) => {
  console.log(event);

  const {eventType, clientId, timestamp} = event;

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
      TableName: `${tablePrefix}-hub-connections`,
      Key: {
        Environment: {
          S: 'dev'
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

  return {online, hubId: clientId};
};
