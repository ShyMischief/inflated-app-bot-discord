### Update Stage
FROM node:20.3.0-alpine3.17 as update

# Update and upgrade
RUN apk update && apk upgrade
# Install dumb-init
RUN apk add --no-cache dumb-init

### Build Stage
FROM update as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build app
RUN npm run build

### Production Stage
FROM node:20.3.0-alpine3.17 as production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy dist folder from build stage
COPY --from=build /app/dist ./dist

# Copy dumb-init from update stage
COPY --from=update /usr/bin/dumb-init /usr/bin/dumb-init

# Set dumb-init as entrypoint
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Expose port
EXPOSE 80

# Set command to run app
CMD ["node", "dist/bot.js"]