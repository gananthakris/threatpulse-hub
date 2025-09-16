"use client";

import { Amplify } from "aws-amplify";

// Note: amplify_outputs.json will be generated when the project is deployed
// For now, we'll check if it exists and only configure if available
export default function ConfigureAmplifyClientSide() {
  // Only configure Amplify if we have the outputs file
  if (typeof window !== 'undefined') {
    try {
      // Try to import amplify_outputs.json dynamically
      // This will be available after deployment
      // @ts-ignore - This file will exist after deployment
      const outputs = require('../../amplify_outputs.json');
      console.log('📱 Amplify outputs loaded:', outputs);
      
      Amplify.configure(outputs, { ssr: true });
      console.log('✅ Amplify configured successfully');
      
      // Store in window for AuthProvider to check
      window.amplifyConfig = outputs;
      console.log('✅ Window.amplifyConfig set:', window.amplifyConfig);
    } catch (err) {
      // File doesn't exist yet - that's OK, we're in development
      console.log('❌ Amplify outputs error:', err);
      console.log('Amplify outputs not found - using mock auth for development');
    }
  }
  
  return null;
}