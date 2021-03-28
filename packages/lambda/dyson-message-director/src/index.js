import { publishMessage } from './clients/sns';
exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    discordMessage = (JSON.parse(event.Records[0].SNS.Message)).content;

    if (discordMessage === 'tight') {
        await publishMessage('tight');
    } else if (discordMessage === 'wtf') {
        await publishMessage('dyson-wtf-react');
    }
}