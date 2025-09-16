import { defineFunction } from '@aws-amplify/backend';

export const authGroups = defineFunction({
  name: 'auth-groups',
  timeoutSeconds: 30,
  environment: {
    AMPLIFY_AUTH_USERPOOL_ID: '',  // Will be set in backend.ts
  },
});