FROM node:18-alpine

WORKDIR /workspace/apps/client

COPY package*.json ./

RUN yarn install

CMD ["yarn", "dev"]
