#!/bin/bash

# Load environment variables from .env file
set -a
source .env
set +a

# Run Aider with Azure OpenAI settings
echo "Starting Aider with Azure OpenAI deployment: $AZURE_OPENAI_DEPLOYMENT_NAME"
aider --openai-api-type azure \
      --openai-api-base "$AZURE_OPENAI_ENDPOINT" \
      --openai-api-key "$AZURE_OPENAI_API_KEY" \
      --openai-api-version "$AZURE_OPENAI_API_VERSION" \
      --model "$AZURE_OPENAI_DEPLOYMENT_NAME" \
      "$@"
