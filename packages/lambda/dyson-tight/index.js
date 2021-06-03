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
    msg.setAvatar("https://i.imgur.com/Hc5ZBAU.jpg");
    msg.setText("Tight");

    Hook.send(msg)

    request.send(JSON.stringify(params));
    await sleep(2000);
}

exports.handler = async (event) => {
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('discord_channel_id');

    bot.on('ready', () => {
        console.log('At the ready!!');
        bot.channels.cache.get(channelId).send('Tight.');
    });

    bot.login(botSecret);

    await sleep(2000);
    return { statusCode: 200, body: JSON.stringify("Hello from AWS!") }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}