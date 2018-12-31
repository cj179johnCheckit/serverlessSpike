'use strict';
console.log('Loading function');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    function getEpochDate(minutesInFuture = 0) {
      const now = Math.floor(Date.now() / 1000);
      if (minutesInFuture === 0) {
        return now;
      }

      const oneMinute = 60;
      return now + (minutesInFuture * oneMinute);
    }

    let results = [];
    let success= 0;
    let failure = 0;
    console.log(event);
    for(var i = 0; i < event.Records.length; i++) {
        let record = event.Records[i].kinesis;
        const recordData = Buffer.from(record.data, 'base64');
        try {
            const now = Math.floor(Date.now() / 1000);
            let ttl = now + 900; // 15 minutes
            const json = JSON.parse(recordData);
            const params = {
                    TableName: "iot-event-counts",
                    Key: {
                        "Environment_CustomerId_EventType": {
                            S: `${json.ENVIRONMENT}_${json.CUSTOMERID}_${json.EVENTTYPE}`
                        },
                        "SerialNumber": {
                            S: `${json.SERIALNUMBER}`
                        }
                    },
                    UpdateExpression: "set #C = :countValue, Environment = :environment, eventType = :eventType, customerId = :customerId, validUntil = :ttl",
                    ExpressionAttributeNames: {
                        '#C': 'count'
                    },
                    ExpressionAttributeValues: {
                        ":countValue": {
                            N: json.COUNTVALUE.toString()
                        },
                        ":environment" : {
                            S: json.ENVIRONMENT
                        },
                        ":ttl" : {
                            N: getEpochDate(15).toString()
                        },
                        ":eventType" : {
                            S: json.EVENTTYPE
                        },
                        ":customerId": {
                            S: json.CUSTOMERID
                        }
                    }
            }
            console.log(params);
            await dynamoDb.updateItem(params).promise();
            results.push({ recordId: record.recordId, result: 'Ok' })
            success++;
        } catch (err) {
            console.log(err);
            results.push({ recordId: record.recordId, result: 'Ok' }) // dont fail this ever.
            failure++;
        }
    }

    console.log(`Successful delivered records ${success}, Failed delivered records ${failure}.`);
    return results;
};
