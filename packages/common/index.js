const region = process.env.AWS_REGION;
var AWS = require('aws-sdk');

const client = new AWS.SecretsManager({
    region: region
});


module.exports = {
    sleep: function sleep(time) {
        console.log('SLEEP -- WAITING ' + time + ' MILI-SECONDS')
        return new Promise((resolve) => setTimeout(resolve, time));
    },

    getSecret: async function getSecret(secretName) {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
            return JSON.parse(data.SecretString)[secretName];
        }
        else {
            return new Buffer(data.SecretBinary, 'base64').toString('ascii');
        }
    }
    
}
