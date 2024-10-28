FROM node:14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Run npm install - for installing dependencies
RUN npm install

# Copy all files from current catalogue into container
COPY ../.. .

# Start the container with bot-app and keep it running
CMD ["node", "app.js"]