const Discord = require('discord.js');

const bot = new Discord.Client();
const region = process.env.AWS_REGION;
var AWS = require('aws-sdk');


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
    console.log('HANDLER -- RETRIEVING SECRETS');
  const botSecret = await getSecret('bot_client_secret');
  const channelId = await getSecret('discord_channel_id');

  bot.on('ready', () => {
      console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN');
      bot.channels.cache.get(channelId).send('Tight.');
      console.log('DYSON -- TIGHTED');
  });

  bot.login(botSecret);

  await sleep(2000);
  
  console.log('HANDLER -- FIN')
  return { statusCode: 200, body: JSON.stringify("Tighted!") }
}

function sleep(time) {
    console.log('SLEEP -- WAITING ' + time + ' MILI-SECONDS')
    return new Promise((resolve) => setTimeout(resolve, time));
}