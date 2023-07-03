# Use the official Node.js image as the base image
FROM node:18

# Set Node Env to "production" to enable Production features
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

RUN npm run build

# Globally install `serve` package to provide a static-file server for our built React application
RUN npm install -g serve

# Expose the build server port number
EXPOSE 3000

# Use the CMD command to specify the command that starts the server to serve your built React application.
# With serve, you can specify the -s flag for a single-page application and the build folder as the source.
CMD ["serve", "-s", "build", "-l", "3000"]
