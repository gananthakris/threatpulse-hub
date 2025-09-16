import { defineFunction } from '@aws-amplify/backend';

export const authUsers = defineFunction({
  name: 'auth-users',
  timeoutSeconds: 30,
  environment: {
    AMPLIFY_AUTH_USERPOOL_ID: '',  // Will be set in backend.ts
  },
});