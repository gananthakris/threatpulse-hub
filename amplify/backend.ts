import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { authUsers } from './functions/auth-users/resource.js';
import { authGroups } from './functions/auth-groups/resource.js';
import { malwareCollector } from './functions/malware-collector/resource.js';
import { Duration } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  authUsers,
  authGroups,
  malwareCollector,
});

// Get the underlying resources
const malwareCollectorLambda = backend.malwareCollector.resources.lambda;
const dataStack = backend.data.resources.cfnResources.cfnGraphqlApi.stack;

// Create EventBridge rule for hourly collection
const hourlyRule = new events.Rule(dataStack, 'HourlyMalwareCollection', {
  schedule: events.Schedule.rate(Duration.hours(1)),
  description: 'Trigger malware collection from MalwareBazaar API every hour',
});

// Add Lambda as target for the rule
hourlyRule.addTarget(new targets.LambdaFunction(malwareCollectorLambda));

// Grant Lambda permissions to access DynamoDB
backend.data.resources.tables['MalwareSample'].grantReadWriteData(malwareCollectorLambda);
