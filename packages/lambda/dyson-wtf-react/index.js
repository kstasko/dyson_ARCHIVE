const { sleep, getSecret } = require('common');
const Discord = require('discord.js');

const DiscordClient = new Discord.Client();

exports.handler = async (event) => {
    console.log('HANDLER -- RETRIEVING SECRETS')
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('discord_channel_id');

    DiscordClient.on('ready', async () => {
        console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN');
        const channel = await DiscordClient.channels.fetch(channelId);

        console.log('DYSON -- FETCHING MESSAGE TO REACT TO');
        const recentMessages = await channel.messages.fetch({ limit: 2 });
        messageToReact = await channel.messages.fetch(recentMessages.last().id);

        console.log('DYSON -- REACTING TO MESSAGE');
        const reactions = ['<:wtf:612768213695987722>', '<:wtf2:663099582120722433>', '<:wtf3:663100351272058880>'];
        await Promise.all(reactions.map(reaction => react(reaction, messageToReact)));
    });

    DiscordClient.login(botSecret);

    await sleep(5000);
    console.log('HANDLER -- FIN')
    return { statusCode: 200, body: JSON.stringify("WTF!") }
}

async function react(reaction, message) {
    return new Promise((resolve, reject) => {
        resolve(message.react(reaction))
    })
} 