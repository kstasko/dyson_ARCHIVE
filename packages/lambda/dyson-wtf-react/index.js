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
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('discord_channel_id');

    bot.on('ready', async () => {
        console.log('WTF Reacting to Prior Message');
        const channel = await bot.channels.fetch(channelId);
        const recentMessages = await channel.messages.fetch({ limit: 2 });
        messageToReact = await channel.messages.fetch(recentMessages.last().id);
        const reactions = ['<:wtf:612768213695987722>', '<:wtf2:663099582120722433>', '<:wtf3:663100351272058880>'];
        reactions.forEach(reaction => {
            messageToReact.react(reaction)
        });
    });

    bot.login(botSecret);

    await sleep(2000);
    return { statusCode: 200, body: JSON.stringify("WTF!") }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}