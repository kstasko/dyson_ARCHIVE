const Discord = require('discord.js');

const DiscordClient = new Discord.Client();
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
    console.log('HANDLER -- RETRIEVING SECRETS')
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('wizard-boat-chat-channel-id');

    DiscordClient.on("ready", () => {
        console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN')
        const channel = DiscordClient.channels.cache.get(channelId);

        if (!channel) return console.error('DYSON -- THE CHANNEL DOES NOT EXIST');
        channel.join().then(connection => {
            console.log("DYSON -- SUCCESSFULLY CONNECTED TO VOICE CHANNEL");

            console.log('DYSON -- LEAVING THE VOICE CHANNEL')
            channel.leave();

        }).catch(e => {
            console.error(e);
        });
    });

    DiscordClient.login(botSecret);

    await sleep(5000);
    console.log('HANDLER -- FIN')
    return { statusCode: 200, body: JSON.stringify("Audio Played") }
}

function sleep(time) {
    console.log('SLEEP -- WAITING ' + time + ' MILI-SECONDS')
    return new Promise((resolve) => setTimeout(resolve, time));
}