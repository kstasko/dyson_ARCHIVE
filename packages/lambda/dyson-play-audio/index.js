const { sleep, getSecret } = require('common');
const Discord = require('discord.js');

const DiscordClient = new Discord.Client();

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