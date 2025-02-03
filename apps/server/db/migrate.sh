#!/usr/bin/env sh
set -e

GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

log() {
  printf "%b%s%b\n" "$1" "$2" "$RESET"
}

wait_for_postgres() {
  printf "%s\n" "⌛ Waiting for database to be start..."
  until pg_isready >/dev/null; do sleep 1; done
  log "$GREEN" "✅ Database is up!"
}

run_migrations() {
  for migration in $(find /migrations -type f -name "*.sql" | sort); do
    psql -f "$migration" >/dev/null
  done
  log "$GREEN" "✅ All migrations applied successfully!"
}

main() {
  wait_for_postgres
  run_migrations
}

main
