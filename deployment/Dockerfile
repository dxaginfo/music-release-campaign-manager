FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install --production
RUN cd client && npm install --production
RUN cd server && npm install --production

# Copy project files
COPY . .

# Build React app
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start server
CMD ["node", "server/server.js"]
