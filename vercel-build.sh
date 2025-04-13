#!/bin/bash

# Force Vercel to perform a clean build by logging the current timestamp
echo "Build started at: $(date)"

# Clear any existing node_modules and dist directories
echo "Cleaning previous build artifacts..."
rm -rf node_modules dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Log completion
echo "Build completed at: $(date)"