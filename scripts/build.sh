#!/bin/bash

BUILD_SRC_PATTERN="webpack.mix.js package* ./scripts ./src ./styleguide/"
HASHFILE=assets/last-build.sha1

# Make sure to bail out on errors.
set -e

cd `dirname $0`/..
NODE_MAJOR_VERSION=8
NPM_MAJOR_VERSION=5
NPM_FALLBACK_VERSION="5.6"
# The npm script to run.
SCRIPT=${SCRIPT:-build}

# Check whether we need to build.
if [[ -f $HASHFILE ]] && find $BUILD_SRC_PATTERN -type f -print0  | xargs -0 sha1sum  | sha1sum -c $HASHFILE --status; then
  echo "No changes since last build detected with hash $HASHFILE."
  echo "[NOTE] Skipping rebuilding assets!"
  exit 0
fi

# Try loading nvm.
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  set +e
  . "$NVM_DIR/nvm.sh"
  set -e
fi

# Switch npm version if NVM is available.
if command -v nvm | grep -q nvm
then
  echo "Using NVM to switch node versions."
  nvm install && nvm use
else
  echo "No NVM installation found, continuing with system node version."
fi

# Verify compatible version
if ! command -v node | grep -q node
then
  echo "No node binary found."
  exit 1;
fi

if ! node --version | grep "v$NODE_MAJOR_VERSION\." -q
then
  echo Incompatible node version `node --version`. A major version of $NODE_MAJOR_VERSION is required.
  exit 1
fi

# Check if npm version is major one. In case it is not, try to fallback by installing one.
if ! npm --version | grep "^$NPM_MAJOR_VERSION\." -q
then
  npm install -g npm@"$NPM_FALLBACK_VERSION"

  # If fallback was unsuccessful, throw an error.
  if ! npm --version | grep "^$NPM_MAJOR_VERSION\." -q
  then
    echo Incompatible node package manager version `npm --version`. A major version of $NPM_MAJOR_VERSION is required.
    exit 1
  fi
fi

# Finally start with the real work.
composer install -d styleguide --no-interaction
npm install

# Be sure at least the CSS assets are cleaned before starting over. This is
# necessary as the styleguide offers all built CSS files for display, so we need
# to make sure there are no old left-overs in there.
rm -rf assets/css/*

# Build assets.
# Make sure warnings lead to build fails by parsing the output. See
# https://github.com/webpack-contrib/sass-loader/issues/539
WARNING=0
while read -r line; do
  echo $line
  if echo $line | grep -q "WARNING"; then
    WARNING=1
  fi
done < <(npm run $SCRIPT 2>&1)
EXIT_CODE=$?

if [ $WARNING = 1 ]; then
  echo "Error: Warning during building occurred.";
  exit 1
else
  if [ $EXIT_CODE = "0" ]; then
    # Update hash.
    find $BUILD_SRC_PATTERN -type f -print0  | xargs -0 sha1sum  | sha1sum > $HASHFILE
  fi
  exit $EXIT_CODE
fi
