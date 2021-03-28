const Discord = require('discord.js');
const bot = new Discord.Client();

const {publishMessage} = require('./sns');

const discordListener = (secret) => {
    bot.once('ready', () => {
        console.log('Dyson the Discord Bot At the Ready!!')
    });

    bot.on('message', async (msg) => {
        // TODO would like to log message id with username
        console.log(msg.author.username + ' has written messageId: ' + 'to the channel.')
        await publishMessage(msg)
    });

    bot.login(secret);
};

module.exports = { discordListener }