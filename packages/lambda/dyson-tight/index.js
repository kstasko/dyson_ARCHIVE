const XMLHttpRequest = require('xmlhttprequest');

const bot = new Discord.Client();
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
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('discord_channel_id');

    const discordUrl = await getSecret('discordUrl');
    const payload = "tight";

    const request = new XMLHttpRequest();
    request.open("POST", discordUrl);
    request.setRequestHeader('Content-type', 'application/json');

    const params = {
        username: 'Dyson',
        content: payload,
    };

    request.send(JSON.stringify(params));
}