const { sleep, getSecret } = require('common');
const Discord = require('discord.js');

const DiscordClient = new Discord.Client();

exports.handler = async (event) => {
  console.log('HANDLER -- RETRIEVING SECRETS');
  const botSecret = await getSecret('bot_client_secret');
  const channelId = await getSecret('discord_channel_id');

  DiscordClient.on('ready', () => {
      console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN');
      DiscordClient.channels.cache.get(channelId).send('Tight.');
      console.log('DYSON -- TIGHTED');
  });

  DiscordClient.login(botSecret);
  await sleep(5000);
  
  console.log('HANDLER -- FIN')
  return { statusCode: 200, body: JSON.stringify("Tighted!") }
}