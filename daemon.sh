#!/bin/sh
cd /home/z/my-project
while true; do
  bun run dev </dev/null >/dev/null 2>&1
  sleep 2
done
