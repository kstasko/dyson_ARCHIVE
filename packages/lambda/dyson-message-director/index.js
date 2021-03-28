const { AWS } = require('./AWS/AWS');

exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    discord_message = event.Records[0].SNS.Message
}