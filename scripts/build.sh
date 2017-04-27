#!/bin/bash

cd `dirname $0`/..
NODE_MAJOR_VERSION=6
# Either "dev" or "production".
BUILD_MODE=${BUILD_MODE:-dev}

#Try loading nvm.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Switch npm version if NVM is available.
command -v nvm | grep -q nvm

if [ $? -eq 0 ]; then
  echo "Using NVM to switch node versions."
  nvm install && nvm use
else
  echo "No NVM installation found, continuing with system node version."
fi

# Verify compatible version
command -v node | grep -q node
if [ ! $? -eq 0 ]; then
  echo "No node binary found."
  exit 1;
fi
node --version | grep "v$NODE_MAJOR_VERSION\." -q
if [ ! $? -eq 0 ]; then
  echo Incompatible node version `node --version`. A major version of $NODE_MAJOR_VERSION is required.
  exit 1
fi

# Finally start with the real work.
composer install -d pattern-lab --no-interaction
npm install
npm run $BUILD_MODE
