const { publishMessage } = require('./clients/sns');
exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    const discordMessage = (JSON.parse(event.Records[0].Sns.Message)).content;

    if (discordMessage === 'tight') {
        await publishMessage('dyson-tight');
    } else if (discordMessage === 'wtf') {
        await publishMessage('dyson-wtf-react');
    } else if (discordMessage.substring(0, 3) === 'c4m') {
        await publishMessage(discordMessage);
    }
}