# ---------------- BUILD STAGE -----------------
FROM node:slim as builder

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

# ----------------- RUNTIME STAGE -----------------
FROM node:slim as runtime

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user and change ownership
RUN useradd -m appuser && chown -R appuser /app

# Switch to the non-root user
USER appuser

# Start the application
CMD ["npm", "start"]