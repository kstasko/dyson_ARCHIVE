module.exports = {
  apps: [{
    name: 'dyson_ec2',
    script: './index.js',
    cwd: '/home/ubuntu/dyson/packages/ec2/source/src'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-223-33-56.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/dyson_ec2.pem',
      ref: 'origin/master',
      repo: 'git@github.com:kstasko/dyson.git',
      path: '/home/ubuntu/dyson_ec2',
      'post-deploy': 'pwd && npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}