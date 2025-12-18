#!/usr/bin/env bash
# exit on error
set -o errexit

# Build backend
cd server
npm install --include=dev
npm run tsc
cd ..

# Build frontend
cd client
npm install --include=dev
npm run build
cd ..

# Move frontend build to backend's public directory
mkdir -p server/build/public
cp -r client/dist/* server/build/public/
