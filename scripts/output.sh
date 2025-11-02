#!/bin/bash

# Script để thêm output path vào Prisma generator client
SCHEMA_FILE="prisma/schema.prisma"
OUTPUT_PATH="../lib/generated/prisma"

# Backup file gốc
cp "$SCHEMA_FILE" "${SCHEMA_FILE}.backup"

# Kiểm tra xem đã có output chưa
if grep -q "output" "$SCHEMA_FILE"; then
  echo "⚠️  Output path đã tồn tại trong schema"
  exit 0
fi

# Thêm output vào generator client
# Tìm dòng "generator client {" và thêm output vào dòng tiếp theo
awk '
/^generator client \{/ {
  print $0
  print "  output   = \"'"$OUTPUT_PATH"'\""
  next
}
{ print }
' "$SCHEMA_FILE" > "${SCHEMA_FILE}.tmp"

# Thay thế file cũ
mv "${SCHEMA_FILE}.tmp" "$SCHEMA_FILE"

echo "✅ Đã thêm output path vào generator client"
echo "📁 Output: $OUTPUT_PATH"
echo ""
echo "Chạy: npx prisma generate"
