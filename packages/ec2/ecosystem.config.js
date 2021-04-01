module.exports = {
  apps: [{
    name: 'dyson',
    script: './index.js',
    cwd: '/home/ubuntu/dyson/current/packages/ec2/src'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-223-30-124.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/dyson_ec2.pem',
      ref: 'origin/ec2-logic-move-to-lambda',
      repo: 'git@github.com:kstasko/dyson.git',
      path: '/home/ubuntu/dyson',
      'post-deploy': 'pwd && cd packages/ec2 && npm install && pm2 startOrRestart ./ecosystem.config.js'
    }
  }
}