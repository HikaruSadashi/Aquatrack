#!/usr/bin/env bash

start=`date +%s`

set -eu -o pipefail

if [ -f "build/backend" ]; then
  rm build/backend
fi

(go build -trimpath -buildmode=pie -mod=readonly -modcacherw -o build/backend "backend/main.go")

echo "[FINISHED]"

end=`date +%s`

runtime=$((end-start))
echo "Duration: ${runtime}s"
