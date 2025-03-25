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
echo "DATABASE_URL: ${DATABASE_URL}"
echo "PORT: $PORT"

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
MAX_RETRIES=60
RETRY_COUNT=0
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping (retry $RETRY_COUNT/$MAX_RETRIES)"
  RETRY_COUNT=$((RETRY_COUNT+1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Failed to connect to PostgreSQL after $MAX_RETRIES attempts"
    exit 1
  fi
  sleep 1
done
echo "PostgreSQL is up - executing migrations"

# Ensure the database exists
echo "Ensuring database exists..."
echo "select 'database exists' from pg_database where datname = 'pse_forum'" | psql "$DATABASE_URL" || createdb -h postgres -U postgres pse_forum

# Run database migrations and seed
echo "Running migrations..."
npm run db:migrate || { echo "Migration failed"; exit 1; }
echo "Migrations completed successfully"

echo "Seeding database..."
npm run db:seed || { echo "Seeding failed"; exit 1; }
echo "Database seeded successfully"

# Start the API server
echo "Starting API server..."
npm run dev 