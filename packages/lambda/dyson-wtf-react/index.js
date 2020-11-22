const Discord = require('discord.js')

const bot = new Discord.Client();
var AWS = require('aws-sdk')
const region = process.env.AWS_REGION;

const client = new AWS.SecretsManager({
    region: region
});

async function getSecret(secretName) {
    const data = await client.getSecretValue({ SecretId: secretName}).promise();
    if ('SecretString' in data) {
        return JSON.parse(data.SecretString)[secretName];
    }
    else {
        return new Buffer(data.SecretBinary, 'base64').toString('ascii');
    }
};