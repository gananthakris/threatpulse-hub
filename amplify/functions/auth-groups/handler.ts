import type { Schema } from '../../data/resource';
import { 
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
  CreateGroupCommand,
  DeleteGroupCommand,
  GetGroupCommand,
  ListGroupsCommand,
  ListUsersInGroupCommand,
  UpdateGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';
// import { env } from '$amplify/env/auth-groups';

const cognitoClient = new CognitoIdentityProviderClient();

export const handler: Schema['authGroupMutation']['functionHandler'] = async (event): Promise<any> => {
  const { operation, groupName, userId, input } = event.arguments;
  const userPoolId = process.env.AMPLIFY_AUTH_USERPOOL_ID;

  if (!userPoolId) {
    throw new Error('User Pool ID not configured');
  }

  try {
    switch (operation) {
      case 'ADD_USER_TO_GROUP': {
        if (!groupName || !userId) {
          throw new Error('Group name and user ID required');
        }
        const command = new AdminAddUserToGroupCommand({
          UserPoolId: userPoolId,
          Username: userId,
          GroupName: groupName
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'REMOVE_USER_FROM_GROUP': {
        if (!groupName || !userId) {
          throw new Error('Group name and user ID required');
        }
        const command = new AdminRemoveUserFromGroupCommand({
          UserPoolId: userPoolId,
          Username: userId,
          GroupName: groupName
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'CREATE_GROUP': {
        if (!groupName) throw new Error('Group name required');
        const command = new CreateGroupCommand({
          UserPoolId: userPoolId,
          GroupName: groupName,
          Description: input?.description || undefined,
          Precedence: input?.precedence || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          group: {
            name: response.Group?.GroupName,
            description: response.Group?.Description,
            precedence: response.Group?.Precedence,
            createdAt: response.Group?.CreationDate?.toISOString(),
            lastModified: response.Group?.LastModifiedDate?.toISOString()
          }
        };
      }

      case 'UPDATE_GROUP': {
        if (!groupName) throw new Error('Group name required');
        const command = new UpdateGroupCommand({
          UserPoolId: userPoolId,
          GroupName: groupName,
          Description: input?.description || undefined,
          Precedence: input?.precedence || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          group: {
            name: response.Group?.GroupName,
            description: response.Group?.Description,
            precedence: response.Group?.Precedence,
            createdAt: response.Group?.CreationDate?.toISOString(),
            lastModified: response.Group?.LastModifiedDate?.toISOString()
          }
        };
      }

      case 'DELETE_GROUP': {
        if (!groupName) throw new Error('Group name required');
        const command = new DeleteGroupCommand({
          UserPoolId: userPoolId,
          GroupName: groupName
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'GET_GROUP': {
        if (!groupName) throw new Error('Group name required');
        const command = new GetGroupCommand({
          UserPoolId: userPoolId,
          GroupName: groupName
        });
        const response = await cognitoClient.send(command);
        return {
          group: {
            name: response.Group?.GroupName,
            description: response.Group?.Description,
            precedence: response.Group?.Precedence,
            createdAt: response.Group?.CreationDate?.toISOString(),
            lastModified: response.Group?.LastModifiedDate?.toISOString()
          }
        };
      }

      case 'LIST_GROUPS': {
        const command = new ListGroupsCommand({
          UserPoolId: userPoolId,
          Limit: Math.min(input?.limit || 50, 60), // Cognito max limit is 60
          NextToken: input?.paginationToken || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          groups: response.Groups?.map(group => ({
            name: group.GroupName,
            description: group.Description,
            precedence: group.Precedence,
            createdAt: group.CreationDate?.toISOString(),
            lastModified: group.LastModifiedDate?.toISOString()
          })) || [],
          paginationToken: response.NextToken
        };
      }

      case 'LIST_GROUP_MEMBERS': {
        if (!groupName) throw new Error('Group name required');
        const command = new ListUsersInGroupCommand({
          UserPoolId: userPoolId,
          GroupName: groupName,
          Limit: Math.min(input?.limit || 50, 60), // Cognito max limit is 60
          NextToken: input?.paginationToken || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          users: response.Users?.map(user => ({
            username: user.Username,
            email: user.Attributes?.find(attr => attr.Name === 'email')?.Value,
            givenName: user.Attributes?.find(attr => attr.Name === 'given_name')?.Value,
            familyName: user.Attributes?.find(attr => attr.Name === 'family_name')?.Value,
            status: user.UserStatus,
            enabled: user.Enabled,
            createdAt: user.UserCreateDate?.toISOString()
          })) || [],
          paginationToken: response.NextToken
        };
      }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  } catch (error) {
    console.error('Error in auth-groups handler:', error);
    throw error;
  }
};