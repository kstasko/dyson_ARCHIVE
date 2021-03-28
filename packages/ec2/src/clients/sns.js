const { AWS } = require('./AWS/AWS');

async function publishMessage(discordMessage) {
    try {
        console.log('Publishing Message to SNS')
        console.log( typeof discordMessage)

        const params = {
            Message: JSON.stringify(discordMessage),
            TopicArn: 'arn:aws:sns:us-east-2:467222377375:dyson-message'
        }
        console.log(params.Message instanceof string)
        
        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();

        //TODO: log below message to Cloudwatch log group
        console.log(`Message ${discordMessage.id} Sent to Topic ${params.TopicArn} with id ${data.MessageId}`);

    } catch (err) {
        console.log('Error Publishing Message', err);
    }
}

module.exports = { publishMessage };