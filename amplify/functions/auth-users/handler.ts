import type { Schema } from '../../data/resource';
import { 
  CognitoIdentityProviderClient, 
  AdminGetUserCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminResetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  ListUsersCommand,
  AdminListGroupsForUserCommand,
  UserType,
  AttributeType
} from '@aws-sdk/client-cognito-identity-provider';
// import { env } from '$amplify/env/auth-users';

const cognitoClient = new CognitoIdentityProviderClient();

const formatUser = (user: UserType) => ({
  username: user.Username,
  email: user.Attributes?.find(attr => attr.Name === 'email')?.Value,
  givenName: user.Attributes?.find(attr => attr.Name === 'given_name')?.Value,
  familyName: user.Attributes?.find(attr => attr.Name === 'family_name')?.Value,
  profilePicture: user.Attributes?.find(attr => attr.Name === 'picture')?.Value,
  status: user.UserStatus,
  enabled: user.Enabled,
  createdAt: user.UserCreateDate?.toISOString(),
  lastModified: user.UserLastModifiedDate?.toISOString(),
  attributes: user.Attributes?.reduce((acc, attr) => ({
    ...acc,
    [attr.Name || '']: attr.Value
  }), {})
});

export const handler: Schema['authUserQuery']['functionHandler'] = async (event): Promise<any> => {
  const { operation, userId, input } = event.arguments;
  const userPoolId = process.env.AMPLIFY_AUTH_USERPOOL_ID;

  if (!userPoolId) {
    throw new Error('User Pool ID not configured');
  }

  try {
    switch (operation) {
      case 'LIST_USERS': {
        const command = new ListUsersCommand({
          UserPoolId: userPoolId,
          Limit: Math.min(input?.limit || 50, 60), // Cognito max limit is 60
          PaginationToken: input?.paginationToken || undefined,
          Filter: input?.filter || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          users: response.Users?.map(formatUser) || [],
          paginationToken: response.PaginationToken
        };
      }

      case 'GET_USER': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminGetUserCommand({
          UserPoolId: userPoolId,
          Username: userId
        });
        const response = await cognitoClient.send(command);
        return {
          user: formatUser({
            Username: response.Username,
            Attributes: response.UserAttributes,
            UserStatus: response.UserStatus,
            Enabled: response.Enabled,
            UserCreateDate: response.UserCreateDate,
            UserLastModifiedDate: response.UserLastModifiedDate
          } as UserType)
        };
      }

      case 'CREATE_USER': {
        if (!input?.email) throw new Error('Email required');
        const command = new AdminCreateUserCommand({
          UserPoolId: userPoolId,
          Username: input.email,
          UserAttributes: [
            { Name: 'email', Value: input.email },
            ...(input.givenName ? [{ Name: 'given_name', Value: input.givenName }] : []),
            ...(input.familyName ? [{ Name: 'family_name', Value: input.familyName }] : [])
          ],
          MessageAction: input.suppressEmail ? 'SUPPRESS' : undefined,
          TemporaryPassword: input.temporaryPassword || undefined
        });
        const response = await cognitoClient.send(command);
        return {
          user: response.User ? formatUser(response.User) : null
        };
      }

      case 'UPDATE_USER': {
        if (!userId) throw new Error('User ID required');
        const attributes: AttributeType[] = [];
        
        if (input?.email) attributes.push({ Name: 'email', Value: input.email });
        if (input?.givenName) attributes.push({ Name: 'given_name', Value: input.givenName });
        if (input?.familyName) attributes.push({ Name: 'family_name', Value: input.familyName });
        if (input?.profilePicture) attributes.push({ Name: 'picture', Value: input.profilePicture });
        
        if (attributes.length > 0) {
          const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: userPoolId,
            Username: userId,
            UserAttributes: attributes
          });
          await cognitoClient.send(command);
        }
        
        return { success: true };
      }

      case 'DELETE_USER': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminDeleteUserCommand({
          UserPoolId: userPoolId,
          Username: userId
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'DISABLE_USER': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminDisableUserCommand({
          UserPoolId: userPoolId,
          Username: userId
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'ENABLE_USER': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminEnableUserCommand({
          UserPoolId: userPoolId,
          Username: userId
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'RESET_PASSWORD': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminResetUserPasswordCommand({
          UserPoolId: userPoolId,
          Username: userId
        });
        await cognitoClient.send(command);
        return { success: true };
      }

      case 'GET_USER_GROUPS': {
        if (!userId) throw new Error('User ID required');
        const command = new AdminListGroupsForUserCommand({
          UserPoolId: userPoolId,
          Username: userId,
          Limit: 50
        });
        const response = await cognitoClient.send(command);
        return {
          groups: response.Groups?.map(group => ({
            name: group.GroupName,
            description: group.Description,
            precedence: group.Precedence,
            createdAt: group.CreationDate?.toISOString(),
            lastModified: group.LastModifiedDate?.toISOString()
          })) || []
        };
      }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  } catch (error) {
    console.error('Error in auth-users handler:', error);
    throw error;
  }
};