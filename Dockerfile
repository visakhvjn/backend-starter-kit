FROM node:slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the ts application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user and change ownership
RUN useradd -m appuser && chown -R appuser /app

# Switch to the non-root user
USER appuser

# Start the application
CMD ["npm", "start"]