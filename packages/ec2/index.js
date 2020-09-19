const express = require('express')
const app = express()
const Discord = require('discord.js');

const bot = new Discord.Client();
app.get('/', (req, res) => {
    res.send("Hello world we made it!")
})

app.get('/dyson', async (req, res) => {
    secret = await getSecret();
    bot.once('ready', () => {
        console.log('At the ready!!')
    });

    bot.on("message", function (msg) {
        if (msg.content === 'tight') {
            msg.channel.send('tight.');
            console.log("toight-ed " + msg.author.username);
        }
    });

    bot.login(secret);
    return { statusCode: 200, body: JSON.stringify("Hello from EC2!") }
})

async function getSecret() {
    var AWS = require('aws-sdk'),
        region = 'us-east-2',
        secretName = 'bot_client_secret',
        secret,
        decodedBinarySecret;

    var client = new AWS.SecretsManager({
        region: region
    });

    const data = await client.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
        secret = JSON.parse(data.SecretString).bot_client_secret;
        return secret;
    }
    else {
        decodedBinarySecret = new Buffer(data.SecretBinary, 'base64').toString('ascii');
        return decodedBinarySecret;
    }

};



app.listen(3000, () => console.log('Server running on port 3000'));