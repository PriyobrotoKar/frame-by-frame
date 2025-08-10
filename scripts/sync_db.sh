#!/bin/bash

# === USAGE ===
# ./sync_db <source_db_url> <target_db_url> [table1 table2 ...]

# === INPUT ===
SOURCE_DB="$1"
TARGET_DB="$2"
shift 2
TABLES=("$@")

cd ./packages/db

# === RESET LOCAL DB ===
echo "🔄 Resetting local DB..."
pnpm run reset -f

# === VALIDATE ===
if [[ -z "$SOURCE_DB" || -z "$TARGET_DB" ]]; then
  echo "❌ Usage: ./sync_db <source_db_url> <target_db_url> [table1 table2 ...]"
  exit 1
fi

DUMP_FILE="db_sync_$(date +%s).dump"

# === DUMP ===
echo "📦 Dumping data from source DB..."

pg_dump \
  -Fc \
  --data-only \
  --dbname="$SOURCE_DB" \
  -f "$DUMP_FILE"

if [[ $? -ne 0 ]]; then
  echo "❌ Failed to dump data."
  exit 1
fi

# === RESTORE ===
echo "📥 Restoring data to target DB..."
pg_restore --data-only --disable-triggers --verbose \
  --dbname="$TARGET_DB" \
  "$DUMP_FILE"

if [[ $? -ne 0 ]]; then
  echo "❌ Restore failed."
  exit 1
fi

# === CLEANUP ===
rm "$DUMP_FILE"

echo "✅ Sync complete!"

