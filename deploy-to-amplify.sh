#!/bin/bash

echo "🚀 Deploying ThreatPulse to AWS Amplify..."
echo "========================================"

# Deploy to AWS Amplify
aws amplify create-app \
  --name "ThreatPulse-Hub" \
  --description "Real-time malware threat intelligence platform" \
  --repository "https://github.com/gananthakris/threatpulse-hub" \
  --platform "WEB_COMPUTE" \
  --region us-east-1

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/"
echo "2. Connect your GitHub repository"
echo "3. Configure build settings (should auto-detect)"
echo "4. Deploy the main branch"
echo ""
echo "🔗 Your app will be available at:"
echo "   https://main.<app-id>.amplifyapp.com"
echo ""
echo "📊 Monitor deployment at:"
echo "   https://console.aws.amazon.com/amplify/home?region=us-east-1#/apps"