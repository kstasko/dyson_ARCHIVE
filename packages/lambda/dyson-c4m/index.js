const Discord = require('discord.js');

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

    console.log(event);
    const message = event.Records[0].Sns.Message;
    console.log(message);

    const botSecret = await getSecret('bot_client_secret'); 
    const channelId = await getSecret('discord_channel_id');

    //const chosenItem = chooseItem(JSON.parse(event.Records[0].Sns.Message.content));
    const chosenItem = message.split(',')[1];
    console.log(chosenItem);

    bot.on('ready', () => {
        console.log('At the ready!!');
        bot.channels.cache.get(channelId).send(chosenItem);
    });

    bot.login(botSecret);
    await sleep(2000);

    return { statusCode: 200, body: JSON.stringify("Hello from AWS!") };
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function chooseItem(message) {
    console.log(message)
    //const listedItems = message.split(',')
    //return listemItems[Math.floor(Math.random()*listedItems.length())];
    return message.split(',')[0];
}