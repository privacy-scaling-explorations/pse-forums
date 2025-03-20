FROM node:18-alpine

WORKDIR /workspace/apps/api

# Install dependencies
RUN apk add --no-cache bash

# Copy package files
COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"] 