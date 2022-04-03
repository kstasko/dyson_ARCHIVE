#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DysonStack } from '../lib/dyson-stack';

const app = new cdk.App();

new DysonStack(app, 'DysonStack', {
  
});