const { AWS } = require('./AWS/AWS');
const DYSON_SNS = 'arn:aws:sns:us-east-2:467222377375:dyson-message'


async function publishMessage(message) {
    try {
        console.log('Publishing Message to SNS')

        const params = {
            Message: message,
            TopicArn: `${DYSON_SNS}`
        }

        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();

        console.log(`Message ${params.Message} Sent to Topic ${params.DYSON_SNS} with id ${data.MessageId}`);

    } catch (err) {
        console.log('Error Publishing Message', err);
    }
}

module.exports = { publishMessage };