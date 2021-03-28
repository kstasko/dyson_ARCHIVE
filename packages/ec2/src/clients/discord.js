const Discord = require('discord.js');
const bot = new Discord.Client();

const {publishMessage} = require('./sns');

const discordListener = (secret) => {
    bot.once('ready', () => {
        console.log('Dyson the Discord Bot At the Ready!!')
    });

    bot.on('message', async (msg) => {
        console.log(msg.author.username + ' has written messageId: ' + msg.id + 'to the channel.')
        await publishMessage(JSON.stringify(msg))
    });

    bot.login(secret);
};

module.exports = { discordListener }