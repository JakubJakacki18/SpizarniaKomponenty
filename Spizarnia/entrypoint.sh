#!/bin/bash

# Replace placeholders in environment.ts with actual environment variable values
if [ -z "$API_URL" ]; then
  echo "API_URL environment variable is not set. Using default value."
  export API_URL="http://localhost:5000"
else
  echo "Using API_URL from environment variable: $API_URL"
fi

# Run envsubst to replace placeholders in environment.ts with actual environment variable values
envsubst < src/assets/env.ts > src/assets/env.tmp.ts && \
mv src/assets/env.tmp.ts src/assets/env.ts

# Start the Angular application
exec "$@"