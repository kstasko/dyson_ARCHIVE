const { publishMessage } = require('./clients/sns');
exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    console.log(event);
    const message = event.Records[0].Sns.Message;
    console.log(message);

    if (discordMessage === 'tight') {
        await publishMessage('dyson-tight', message);
    } else if (discordMessage === 'wtf') {
        await publishMessage('dyson-wtf-react', message)
    } else if (discordMessage.substring(0, 3) === 'c4m') {
        await publishMessage('dyson-c4m', message);
    }
}