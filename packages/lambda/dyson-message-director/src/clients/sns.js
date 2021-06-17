const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2'});

async function publishMessage(topic. message) {
    try {
        console.log('Publishing Message to SNS')

        const params = {
            Message: message,
            TopicArn: `arn:aws:sns:us-east-2:467222377375:${topic}`
        }

        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();

        console.log(`Message ${params.Message} Sent to Topic ${params.TopicArn} with id ${data.MessageId}`);

    } catch (err) {
        console.log('Error Publishing Message', err);
    }
}

module.exports = { publishMessage };