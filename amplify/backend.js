import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { authUsers } from './functions/auth-users/resource.js';
import { authGroups } from './functions/auth-groups/resource.js';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth,
    data,
    authUsers,
    authGroups,
});
// Grant Cognito permissions to auth-users Lambda
backend.authUsers.resources.lambda.addToRolePolicy(new PolicyStatement({
    actions: [
        'cognito-idp:AdminGetUser',
        'cognito-idp:AdminCreateUser',
        'cognito-idp:AdminDeleteUser',
        'cognito-idp:AdminDisableUser',
        'cognito-idp:AdminEnableUser',
        'cognito-idp:AdminResetUserPassword',
        'cognito-idp:AdminUpdateUserAttributes',
        'cognito-idp:ListUsers',
        'cognito-idp:AdminListGroupsForUser',
    ],
    resources: [backend.auth.resources.userPool.userPoolArn],
}));
// Grant Cognito permissions to auth-groups Lambda
backend.authGroups.resources.lambda.addToRolePolicy(new PolicyStatement({
    actions: [
        'cognito-idp:AdminAddUserToGroup',
        'cognito-idp:AdminRemoveUserFromGroup',
        'cognito-idp:CreateGroup',
        'cognito-idp:DeleteGroup',
        'cognito-idp:GetGroup',
        'cognito-idp:ListGroups',
        'cognito-idp:ListUsersInGroup',
        'cognito-idp:UpdateGroup',
    ],
    resources: [backend.auth.resources.userPool.userPoolArn],
}));
// Set the User Pool ID as environment variable for the Lambda functions
const userPoolId = backend.auth.resources.userPool.userPoolId;
backend.authUsers.resources.cfnResources.cfnFunction.addPropertyOverride('Environment.Variables.AMPLIFY_AUTH_USERPOOL_ID', userPoolId);
backend.authGroups.resources.cfnResources.cfnFunction.addPropertyOverride('Environment.Variables.AMPLIFY_AUTH_USERPOOL_ID', userPoolId);
