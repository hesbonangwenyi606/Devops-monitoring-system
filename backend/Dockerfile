# Use a lightweight Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --only=production || npm install

# Copy the rest of the backend source code
COPY . .

# ✅ Generate Prisma client for Alpine (fixes "Query Engine not found" error)
RUN npx prisma generate

# ✅ Optional: run database migrations automatically (only if you want auto-sync)
# RUN npx prisma migrate deploy

# Expose backend port
EXPOSE 5000

# Start the backend service
CMD ["node", "src/index.js"]
