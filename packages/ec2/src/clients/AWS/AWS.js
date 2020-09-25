var AWS = require('aws-sdk');

const useLocalSecrets = () => {
    const { accessKeyId, secretAccessKey } = require('./accessKeys');
    AWS.config.update({ region: 'us-east-2', accessKeyId, secretAccessKey })
}

process.env.LOCAL === 'true' ?
    useLocalSecrets() :
    AWS.config.update({ region: 'us-east-2' });

module.exports = { AWS };

