#!/usr/bin/env bash
# Extract English Markdown from the EPUB for personal translation reference.
# Usage: ./scripts/extract-epub.sh /path/to/book.epub

set -euo pipefail

EPUB="${1:-/Users/mohammad/Documents/react-application-architecture-production-2nd/react-application-architecture-production-2nd.epub}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/source/en"
IMAGES="$ROOT/source/images"
TMP="$(mktemp -d)"

cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

if [[ ! -f "$EPUB" ]]; then
  echo "EPUB not found: $EPUB" >&2
  exit 1
fi

echo "Extracting from: $EPUB"
unzip -q "$EPUB" -d "$TMP"

mkdir -p "$OUT" "$IMAGES"

# Copy images from EPUB (pandoc --extract-media may miss some paths)
if [[ -d "$TMP/EPUB/images" ]]; then
  cp -R "$TMP/EPUB/images/." "$IMAGES/"
fi

convert() {
  local src="$1"
  local dest="$2"
  pandoc "$src" \
    -f html \
    -t markdown \
    --wrap=none \
    --extract-media="$IMAGES" \
    -o "$dest"
}

convert "$TMP/EPUB/Preface.xhtml" "$OUT/preface.md"

for i in $(seq 1 13); do
  convert "$TMP/EPUB/Chapter_${i}.xhtml" "$OUT/chapter-$(printf '%02d' "$i").md"
done

echo "Done. Files written to $OUT"
