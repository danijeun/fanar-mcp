# Use official Node.js image
FROM node:20-bullseye

# Set workdir
WORKDIR /app

# Copy files
COPY . .

# Install Node.js dependencies
RUN npm install

# Build TypeScript
RUN npm run build

# Expose port (change if needed)
EXPOSE 8000

# Default command
CMD ["npm", "start"] 