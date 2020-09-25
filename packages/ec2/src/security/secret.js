const { AWS } = require('../clients/AWS/AWS');
const secretName = 'bot_client_secret';


async function getSecret() {

    const SNSClient = new AWS.SecretsManager();

    const data = await SNSClient.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
        return JSON.parse(data.SecretString).bot_client_secret;
       
    }
    else {
        return new Buffer(data.SecretBinary, 'base64').toString('ascii');
    }
};

module.exports = { getSecret }