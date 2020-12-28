import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import { Role, ServicePrincipal, IManagedPolicy, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam';
import * as path from 'path';
import * as fs from 'fs';

const lambdas = fs.readdirSync('../../lambda');

export class DysonStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, stackProps?: cdk.StackProps) {
    super(app, id, stackProps);
    const lambdaRole = new Role(this, 'lambdaRole',
      {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite')]
      }
    )

    lambdas.forEach((dysonLambda) => {
      return new lambda.Function(this, dysonLambda, {
        code: new lambda.InlineCode(path.join(__dirname, '..', '..', 'lambda', dysonLambda)),
        handler: 'index.handler',
        runtime: lambda.Runtime.NODEJS_12_X,
        timeout: cdk.Duration.seconds(10),
        role: lambdaRole
      });
    })

  }
}

const app = new cdk.App();
new DysonStack(app, 'DysonStack');
app.synth();
