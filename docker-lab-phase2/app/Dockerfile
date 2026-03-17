FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Fix ownership
RUN chown -R appuser:appgroup /app

# Drop privileges
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]