module.exports = {
    apps: [{
      name: 'dyson_ec2',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-223-33-56.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/dyson_ec2.pem',
        ref: 'origin/master',
        repo: 'git@github.com:kstasko/dyson_ec2.git',
        path: '/home/ubuntu/dyson_ec2',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }