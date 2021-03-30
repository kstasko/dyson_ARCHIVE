const SNS = require('./clients/sns');
exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    const discordMessage = (JSON.parse(event.Records[0].SNS.Message)).content;

    if (discordMessage === 'tight') {
        await SNS.publishMessage('tight');
    } else if (discordMessage === 'wtf') {
        await SNS.publishMessage('dyson-wtf-react');
    }
}