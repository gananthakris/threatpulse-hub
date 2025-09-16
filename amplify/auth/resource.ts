import { defineAuth } from '@aws-amplify/backend';
import { authUsers } from '../functions/auth-users/resource';
import { authGroups } from '../functions/auth-groups/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // Temporarily disabled Google OAuth - uncomment when secrets are configured
    // externalProviders: {
    //   google: {
    //     clientId: secret('GOOGLE_CLIENT_ID'),
    //     clientSecret: secret('GOOGLE_CLIENT_SECRET'),
    //     scopes: ['email', 'profile', 'openid'],
    //     attributeMapping: {
    //       email: 'email',
    //       givenName: 'given_name',
    //       familyName: 'family_name',
    //       profilePicture: 'picture',
    //     },
    //   },
    //   callbackUrls: [
    //     'http://localhost:3000/',
    //     'http://localhost:3000/dashboard/ecommerce',
    //     // Production domain URLs
    //     'https://www.template.chinchilla-ai.com/',
    //     'https://www.template.chinchilla-ai.com/dashboard/ecommerce',
    //   ],
    //   logoutUrls: [
    //     'http://localhost:3000/authentication/sign-in',
    //     // Production domain URL
    //     'https://www.template.chinchilla-ai.com/authentication/sign-in',
    //   ],
    // },
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
    givenName: {
      required: false,
      mutable: true,
    },
    familyName: {
      required: false,
      mutable: true,
    },
    profilePicture: {
      required: false,
      mutable: true,
    },
  },
  groups: ['ADMINS'],
  access: (allow) => [
    allow.resource(authUsers).to([
      'manageUsers',
      'createUser',
      'deleteUser',
      'deleteUserAttributes',
      'disableUser',
      'enableUser',
      'forgetDevice',
      'getDevice',
      'getUser',
      'updateUserAttributes',
      'setUserSettings',
      'setUserPassword',
      'setUserMfaPreference',
      'resetUserPassword',
      'listUsers',
    ]),
    allow.resource(authGroups).to([
      'manageGroups',
      'addUserToGroup',
      'removeUserFromGroup',
      'createGroup',
      'deleteGroup',
      'getGroup',
      'listGroups',
      'listUsersInGroup',
      'updateGroup',
    ]),
  ],
});