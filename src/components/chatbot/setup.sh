#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "npm is not installed. Please install npm and try again."
  exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create a .env file with the following variables:"
  echo "PUBLIC_SUPABASE_URL=your_supabase_url"
  echo "PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
  echo "SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key"
  echo "OPENAI_API_KEY=your_openai_api_key"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install dotenv @supabase/supabase-js

# Compile TypeScript setup file
echo "Compiling setup script..."
npx tsc src/components/chatbot/setup.ts --esModuleInterop --resolveJsonModule --target es2020 --module commonjs

# Run setup script
echo "Running setup script..."
node src/components/chatbot/setup.js

# Clean up
echo "Cleaning up..."
rm src/components/chatbot/setup.js

echo "Setup complete!" 