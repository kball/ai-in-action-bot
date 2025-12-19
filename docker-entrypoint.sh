#!/bin/sh
set -e

# Start cron daemon in foreground with log level 2 (errors and warnings)
# -f flag runs in foreground
# -l 2 sets log level to 2 (errors and warnings)
crond -f -l 2 &

# Execute the main command (node index.js)
exec "$@"
