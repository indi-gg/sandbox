# Build stage
FROM --platform=linux/amd64 public.ecr.aws/v0e8p7z2/public_images:node-18-alpine AS build

WORKDIR /usr/src/app


# Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code.
COPY . .

# Build your app
RUN yarn build

# Production stage
FROM public.ecr.aws/v0e8p7z2/public_images:node-18-alpine AS production

# Set non-root user and expose port 3000.
EXPOSE 3000
USER node

WORKDIR /usr/src/app

# Copy built node modules and built files
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]