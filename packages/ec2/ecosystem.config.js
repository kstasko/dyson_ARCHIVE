module.exports = {
    apps: [{
      name: 'dyson_ec2',
      script: './src/index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-223-33-56.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/dyson_ec2.pem',
        ref: 'origin/master',
        repo: 'git@github.com:kstasko/dyson.git',
        "pre-deploy-local" : "echo 'moving to ec2 dir' && cd packages/ec2",
        path: '/home/ubuntu/dyson_ec2',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }