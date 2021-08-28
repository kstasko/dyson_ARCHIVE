const { sleep, getSecret } = require('common');
const Discord = require('discord.js');

const DiscordClient = new Discord.Client();

exports.handler = async (event) => {
    console.log('HANDLER -- MESSAGE RECEIVED');
    const message = event.Records[0].Sns.Message;

    console.log('HANDLER -- RETRIEVING SECRETS');
    const botSecret = await getSecret('bot_client_secret'); 
    const channelId = await getSecret('discord_channel_id');

    console.log('HANDLER -- MAKING SELECTION FROM CHOICES');
    const selection = chooseItem(message.substring(4));

    console.log('HANDLER -- ' + selection + ' WAS SELECTED');

    DiscordClient.on('ready', () => {
        console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN')
        DiscordClient.channels.cache.get(channelId).send(selection);
    });

    DiscordClient.login(botSecret);
    await sleep(2000);
    
    console.log('HANDLER -- FIN')
    return { statusCode: 200, body: JSON.stringify("Item Chosen!") };
}

function chooseItem(message) {
    const listOfItems = message.split(',');
    return listOfItems[Math.floor(Math.random()*listOfItems.length)];
}