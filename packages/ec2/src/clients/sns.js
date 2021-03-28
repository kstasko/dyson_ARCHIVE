const { AWS } = require('./AWS/AWS');

async function publishMessage(message) {
    try {
        console.log('Publishing Message to SNS')

        const params = {
            Message: message,
            TopicArn: 'arn:aws:sns:us-east-2:467222377375:dyson-message'
        }

        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();

        console.log(`Message ${params.Message.id} Sent to Topic ${params.TopicArn} with id ${data.MessageId}`);

    } catch (err) {
        console.log('Error Publishing Message', err);
    }
}

module.exports = { publishMessage };