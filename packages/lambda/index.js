const Discord = require('discord.js');

const bot = new Discord.Client();

async function getSecret() {
  var AWS = require('aws-sdk'),
    region = process.env.AWS_REGION,
    secretName = 'bot_client_secret',
    secret,
    decodedBinarySecret;

  var client = new AWS.SecretsManager({
    region: region
  });

  const data = await client.getSecretValue({ SecretId: secretName }).promise();
  if ('SecretString' in data) {
    secret = JSON.parse(data.SecretString).bot_client_secret;
    return secret;
  }
  else {
    decodedBinarySecret = new Buffer(data.SecretBinary, 'base64').toString('ascii');
    return decodedBinarySecret;
  }

};

exports.handler = async (event) => {
  secret = await getSecret();
  bot.once('ready', () => {
    console.log('At the ready!!')
  });

  bot.on("message", function (msg) {
    if (msg.content === 'tight') {
      msg.channel.send('tight.');
      console.log("toight-ed " + msg.author.username);
    }
  });

  bot.login(secret);
  return { statusCode: 200, body: JSON.stringify("Hello from AWS!") }
}
