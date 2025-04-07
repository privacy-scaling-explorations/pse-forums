#!/bin/bash

# Exit on error
set -e

echo "Starting custom Vercel build script"

# Remove existing package-lock.json and node_modules to avoid npm optional dependency bug
echo "Cleaning up existing installations"
rm -rf package-lock.json node_modules
rm -rf apps/client/node_modules

# Install dependencies with specific flags to handle Rollup's optional dependencies
echo "Installing dependencies"
npm install --no-optional --force

# Build the client application
echo "Building client application"
cd apps/client
npm run build

echo "Build completed successfully" 