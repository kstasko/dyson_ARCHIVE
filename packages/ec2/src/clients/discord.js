const Discord = require('discord.js');
const bot = new Discord.Client();

const discordListener = (secret) => {
    bot.once('ready', () => {
        console.log('At the ready!!')
    });

    bot.on("message", async (msg) => {
        if (msg.content === 'tight') {
            console.log("toight-ed " + msg.author.username);
            return 'dyson_tight';
        }
    });

    bot.login(secret);
};

module.exports = { discordListener }