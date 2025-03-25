FROM node:18-alpine

WORKDIR /workspace/apps/api

# Install dependencies
RUN apk add --no-cache bash postgresql-client

# Copy package files
COPY package*.json ./

# Make entrypoint executable 
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

RUN npm install

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"] 