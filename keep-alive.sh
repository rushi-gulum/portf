#!/bin/sh
while true; do
  cd /home/z/my-project
  bun run dev 2>&1
  echo "Server exited, restarting in 2s..."
  sleep 2
done