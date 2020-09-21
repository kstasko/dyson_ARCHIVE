const express = require('express');
const Discord = require('discord.js');
var AWS = require('aws-sdk'),
region = 'us-east-2',
secretName = 'bot_client_secret',
secret,
decodedBinarySecret;

const app = express();
const bot = new Discord.Client();
const AWS_ACCOUNT = 'arn:aws:sns:us-east-2:467222377375'


app.get('/', (req, res) => {
    res.status(200).send("Hello world we made it!");
})

app.get('/dyson', async (req, res) => {
    secret = await getSecret();
    bot.once('ready', () => {
        console.log('At the ready!!')
    });

    bot.on("message", async (msg) => {
        if (msg.content === 'tight') {
            await publishMessage('dyson_tight');
            // msg.channel.send('tight.');
            console.log("toight-ed " + msg.author.username);
        }
    });

    bot.login(secret);
    res.status(200).send("Hello from EC2!");
});

async function publishMessage(topic) {
    AWS.config.update({region: 'us-east-2'});
    try {
        const params = {
            Message: 'hello!',
            TopicArn: `${AWS_ACCOUNT}:${topic}`
        }
    
        const awsSNSClient = new AWS.SNS()
        const data = await awsSNSClient.publish(params).promise();
        console.log(`Message ${params.Message} sent to topic ${params.TopicArn} with id ${data.MessageId}`);
        console.log('Message sent at', new Date());
    } catch (err) {
        console.log('Error publishing message', err);
    }
}

async function getSecret() {
    console.log('getting secret, making client secret manager');


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