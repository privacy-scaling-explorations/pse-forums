FROM node:20-alpine

WORKDIR /workspace/apps/api

# Install dependencies
RUN apk add --no-cache bash postgresql-client

# Copy package files
COPY package*.json ./

# Make entrypoint executable 
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

# Install dependencies with increased timeout
RUN npm install --network-timeout 600000

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"] 

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"] 