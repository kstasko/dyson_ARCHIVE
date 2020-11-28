const Discord = require('discord.js');
const bot = new Discord.Client();
const {publishMessage} = require('./sns');

const discordListener = (secret) => {
    bot.once('ready', () => {
        console.log('Discord Bot At the Ready!!')
    });

    bot.on("message", async (msg) => {
        if (msg.content === 'tight') {
            console.log("toight-ed " + msg.author.username);
            await publishMessage('dyson_tight');
        }
        if (msg.content === 'wtf') {
            console.log (msg.author.username + 'is wtf reacting')
            await publishMessage('dyson_wtf_reaction')
        }
    });

    bot.login(secret);
};

module.exports = { discordListener }