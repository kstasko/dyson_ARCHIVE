import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import { Role, ServicePrincipal, IManagedPolicy, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam';
import * as path from 'path';

export class DysonStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, stackProps?: cdk.StackProps) {
    super(app, id, stackProps);
    const lambdaRole = new Role(this, 'lambdaRole',
      {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite')]
      }
    )

    new lambda.Function(this, 'dyson-tight-2', {
      code: new lambda.InlineCode(path.join(__dirname, '..', '..', 'lambda', 'dyson-tight')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(10),
      role: lambdaRole
    });

  }
}

const app = new cdk.App();
new DysonStack(app, 'DysonStack');
app.synth();
