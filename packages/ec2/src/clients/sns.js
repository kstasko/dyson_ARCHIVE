const { AWS } = require('./AWS/AWS');
const AWS_ACCOUNT = 'arn:aws:sns:us-east-2:467222377375'


async function publishMessage(topic) {
    try {
        console.log('trying to send message')
        const params = {
            Message: 'hello!',
            TopicArn: `${AWS_ACCOUNT}:${topic}`
        }

        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();
        console.log(`Message ${params.Message} sent to topic ${params.TopicArn} with id ${data.MessageId}`);
    } catch (err) {
        console.log('Error publishing message', err);
    }
}

module.exports = { publishMessage };