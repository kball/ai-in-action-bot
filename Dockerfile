FROM node:lts-alpine AS base
WORKDIR /usr/src/app

# Install dependencies
# Use package-lock.json for deterministic installs
COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# Install dcron for scheduled jobs
RUN apk add --no-cache dcron curl

# Copy application code
COPY . .

# Run the build script (deploys Discord commands)
RUN npm run build

# Copy crontab and entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
COPY crontab /etc/crontabs/root

# Make entrypoint executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
# Enable proactive messaging by default
ENV PROACTIVE_REMINDERS_ENABLED=true
ENV PROACTIVE_WEEKLY_ENABLED=true

# Expose the port the app runs on
EXPOSE ${PORT}

# Use entrypoint to start both cron and node
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD [ "node", "index.js" ] 