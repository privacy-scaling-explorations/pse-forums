FROM node:18-alpine

WORKDIR /workspace/apps/client

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]
