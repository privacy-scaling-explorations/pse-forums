FROM node:20-alpine

WORKDIR /workspace/apps/client

COPY package*.json ./

# Install dependencies
RUN yarn install --network-timeout 600000

# Explicitly install the TanStack router plugin matching the router version
RUN yarn add -D @tanstack/router-plugin@1.106.0

COPY . .

# Create empty module file for Rollup native modules
RUN mkdir -p /workspace/apps/client/src/utils && \
    echo "export default {};" > /workspace/apps/client/src/utils/empty-module.js

EXPOSE 5173

CMD ["yarn", "dev", "--", "--host", "0.0.0.0"]
