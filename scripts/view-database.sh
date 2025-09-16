#!/bin/bash

# Script to view DynamoDB tables for ThreatPulse

echo "🔍 Viewing ThreatPulse Database Tables..."
echo "======================================="

# List all tables
echo -e "\n📋 Available Tables:"
aws dynamodb list-tables --region us-east-1 | grep -E "MalwareSample|AnalysisResult|IOC|CollectionRun|DashboardStats"

# Get table name (adjust the pattern if needed)
TABLE_NAME=$(aws dynamodb list-tables --region us-east-1 | grep -o '"MalwareSample[^"]*"' | tr -d '"' | head -1)

if [ ! -z "$TABLE_NAME" ]; then
    echo -e "\n📊 Scanning MalwareSample table: $TABLE_NAME"
    echo "----------------------------------------"
    aws dynamodb scan \
        --table-name "$TABLE_NAME" \
        --region us-east-1 \
        --max-items 10 \
        --output json | jq '.Items[] | {
            id: .id.S,
            fileName: .fileName.S,
            threatLevel: .threatLevel.S,
            signature: .signature.S,
            sha256Hash: .sha256Hash.S
        }'
else
    echo "⚠️  No MalwareSample table found. Make sure the sandbox is deployed."
fi

echo -e "\n💡 Tip: You can also view the data at:"
echo "   https://console.aws.amazon.com/dynamodbv2/home?region=us-east-1#tables"