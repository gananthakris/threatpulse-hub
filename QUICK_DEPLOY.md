# 🚀 Quick Deploy ThreatPulse to AWS Amplify (2 Minutes)

## One-Click Deploy Link
[![Deploy to Amplify](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/gananthakris/threatpulse-hub)

## Manual Deploy Steps

### 1. Open AWS Amplify Console
**Direct Link:** https://console.aws.amazon.com/amplify/home?region=us-east-1#/create

### 2. Connect Your Repository
- Click **"Deploy without Git provider"** for quick start
- OR click **"GitHub"** and authorize (recommended for auto-updates)
- Repository: `gananthakris/threatpulse-hub`
- Branch: `main`

### 3. Auto-Detection
AWS Amplify will automatically:
- ✅ Detect Next.js 15 framework
- ✅ Configure build settings
- ✅ Set up Node.js 20
- ✅ Configure SSR (Server-Side Rendering)

### 4. Click "Save and Deploy"
- Build takes ~10-15 minutes
- Your app URL: `https://main.dxxxxxxxxxxxxx.amplifyapp.com`

## What Gets Deployed

### 🔐 Security Features
- AWS Cognito Authentication
- DDoS Protection (CloudFront)
- WAF Rules
- Encrypted data storage

### 📊 Real-Time Threat Intelligence
- MalwareBazaar API Integration
- Hourly automated collection (EventBridge)
- Threat scoring algorithm
- GraphQL API (AppSync)

### 🗄️ Infrastructure
- DynamoDB tables
- Lambda functions
- CloudWatch monitoring
- X-Ray tracing

## Verify Deployment

### Check Lambda Function
```bash
aws lambda invoke \
  --function-name amplify-threatpulsehub-main-malware-collector \
  --region us-east-1 \
  response.json && cat response.json
```

### View Collected Data
```bash
aws dynamodb scan \
  --table-name MalwareSample-xxxxx \
  --region us-east-1 \
  --max-items 5
```

## Monitor Your App
- **CloudWatch:** https://console.aws.amazon.com/cloudwatch/
- **Amplify Console:** https://console.aws.amazon.com/amplify/
- **Lambda Functions:** https://console.aws.amazon.com/lambda/

## Troubleshooting

### Build Failed?
- Check Node.js version (must be 20.x)
- Verify `amplify_outputs.json` exists
- Review build logs in Amplify Console

### No Data Showing?
- Lambda runs hourly - wait or trigger manually
- Check CloudWatch logs for errors
- Verify DynamoDB has data

## Success! 🎉
Your ThreatPulse Intelligence Hub is now live and collecting real-time threat data!