import { createServerRunner } from '@aws-amplify/adapter-nextjs';

// Try to load amplify_outputs.json if it exists
let amplifyConfig: any = null;

try {
  // @ts-ignore - This file will exist after deployment
  amplifyConfig = require('../../amplify_outputs.json');
} catch (err) {
  console.log('Amplify outputs not found - server auth will use mock mode');
}

// Create server runner with config if available
export const { runWithAmplifyServerContext } = amplifyConfig 
  ? createServerRunner({ config: amplifyConfig })
  : { 
      // Mock server context for development without Amplify backend
      runWithAmplifyServerContext: async ({ operation }: any) => {
        console.log('Mock server context - auth operations will return mock data');
        return operation({});
      }
    };