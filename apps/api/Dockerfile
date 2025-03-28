FROM node:20-alpine

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

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"] 