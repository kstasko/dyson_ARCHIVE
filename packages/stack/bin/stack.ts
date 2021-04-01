#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DysonStack } from '../lib/dyson-stack';


const app = new cdk.App();
new DysonStack(app, 'DysonStack', {
    env: {
        account: process.env.AWS_DEFAULT_ACCOUNT,
        region: 'us-east-2',
    }
});
