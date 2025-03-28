FROM node:20-alpine

WORKDIR /workspace/apps/client

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--", "--host", "0.0.0.0"]
