const webhook = require("webhook-discord");

var AWS = require('aws-sdk');
const region = process.env.AWS_REGION;

const client = new AWS.SecretsManager({
  region: region
});

async function getSecret(secretName) {
  const data = await client.getSecretValue({ SecretId: secretName }).promise();
  if ('SecretString' in data) {
    return JSON.parse(data.SecretString)[secretName];
  }
  else {
    return new Buffer(data.SecretBinary, 'base64').toString('ascii');
  }
};

exports.handler = async (event) => {
    const discordUrl = await getSecret('discordUrl');
    const Hook = new webhook.Webhook(discordUrl);

    const msg = new webhook.MessageBuilder();
    msg.setName("Dyson");
    msg.setText("tight");

    Hook.send(msg)

    request.send(JSON.stringify(params));
}