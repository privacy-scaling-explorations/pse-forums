#!/bin/sh
set -e

echo "Starting API server setup..."

# Install dependencies for shared package
echo "Setting up shared package..."
cd ../shared
npm install
npm run build

# Go back to API directory and install dependencies
echo "Setting up API package..."
cd ../api
npm install

# Display environment info
echo "Environment variables:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"

# Start the API server
echo "Starting API server..."
npm run dev 