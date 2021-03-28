import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Role, ServicePrincipal, ManagedPolicy } from '@aws-cdk/aws-iam';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as path from 'path';
import * as fs from 'fs';
import { Code } from '@aws-cdk/aws-lambda';

const lambdas = fs.readdirSync(`${__dirname}/../../lambda`);

export class DysonStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, stackProps?: cdk.StackProps) {
    super(app, id, stackProps);

    //TODO create Director servicerole in IAM
    const lambdaRole = new Role(this, 'lambdaRole',
      {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'), ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaFullAccess')]
      }
    )

    lambdas.forEach((lambdaId) => {

      const dysonLambda = new lambda.Function(this, `${lambdaId}-lambda`, {
        code: Code.fromAsset(path.join(__dirname, '..', '..', 'lambda', lambdaId)),
        handler: lambdaId === 'dyson-message-director' ? 'src/index.handler' : 'index.handler',
        runtime: lambda.Runtime.NODEJS_12_X,
        timeout: cdk.Duration.seconds(10),
        role: lambdaRole
      });
      if (lambdaId === 'dyson-message-director'){
        dysonLambda.addEventSource(new SnsEventSource(new Topic(this, 'dyson-message', {topicName:'dyson-message'})));
      } else {
        dysonLambda.addEventSource(new SnsEventSource(new Topic(this, lambdaId, {topicName: lambdaId})));
      }
    })

  }
}

const app = new cdk.App();
new DysonStack(app, 'DysonStack');
app.synth();
