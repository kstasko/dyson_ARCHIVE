const { AWS } = require('./AWS/AWS');
const AWS_ACCOUNT = 'arn:aws:sns:us-east-2:467222377375'


async function publishMessage(topic) {
    try {
        console.log('SNS Trying to Send Message')
        const params = {
            Message: 'hello!',
            TopicArn: `${AWS_ACCOUNT}:${topic}-topic`
        }

        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();
        console.log(`Message ${params.Message} Sent to Topic ${params.TopicArn} with id ${data.MessageId}`);
    } catch (err) {
        console.log('Error Publishing Message', err);
    }
}

module.exports = { publishMessage };