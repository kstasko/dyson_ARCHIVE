import { App, Duration, Stack, StackProps} from '@aws-cdk/core';
import { Role, ServicePrincipal, ManagedPolicy } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { Topic } from '@aws-cdk/aws-sns';
import * as path from 'path';
import * as fs from 'fs';


const lambdas = fs.readdirSync(`${__dirname}/../../lambda`);

export class DysonStack extends Stack {
  constructor(app: App, id: string, stackProps?: StackProps) {
    super(app, id, stackProps);

    const lambdaRole = new Role(this, 'lambdaRole',
      {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'), 
          ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'), 
          ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
          ManagedPolicy.fromAwsManagedPolicyName('AmazonSNSFullAccess'),
        ]
      }
    )
    
    lambdas.forEach((lambdaId) => {

      const dysonLambda = new Function(this, `${lambdaId}-lambda`, {
        code: Code.fromAsset(path.join(__dirname, '..', '..', 'lambda', lambdaId)),
        handler: lambdaId === 'dyson-message-director' ? 'src/index.handler' : 'index.handler',
        runtime: Runtime.NODEJS_12_X,
        timeout: Duration.seconds(10),
        role: lambdaRole,
        functionName: lambdaId
      });
      if (lambdaId === 'dyson-message-director'){
        dysonLambda.addEventSource(new SnsEventSource(new Topic(this, 'dyson-message', {topicName:'dyson-message'})));
      } else {
        dysonLambda.addEventSource(new SnsEventSource(new Topic(this, lambdaId, {topicName: lambdaId})));
      }
    })

  }
}

const app = new App();
new DysonStack(app, 'DysonStack');
app.synth();
