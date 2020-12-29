import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Role, ServicePrincipal, ManagedPolicy } from '@aws-cdk/aws-iam';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as path from 'path';
import * as fs from 'fs';

const lambdas = fs.readdirSync(`${__dirname}/../../lambda`);

export class DysonStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, stackProps?: cdk.StackProps) {
    super(app, id, stackProps);
    const lambdaRole = new Role(this, 'lambdaRole',
      {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'), ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaFullAccess')]
      }
    )

    lambdas.forEach((lambdaId) => {
      const dysonLambda = new lambda.Function(this, lambdaId, {
        code: new lambda.InlineCode(path.join(__dirname, '..', '..', 'lambda', `${lambdaId}-lambda`)),
        handler: 'index.handler',
        runtime: lambda.Runtime.NODEJS_12_X,
        timeout: cdk.Duration.seconds(10),
        role: lambdaRole
      })
        // .addEventSource(new SnsEventSource(new Topic(this, `${lambdaId}-topic`)));
    })

  }
}

const app = new cdk.App();
new DysonStack(app, 'DysonStack');
app.synth();
