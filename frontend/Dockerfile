# --- Build Stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY src ./src
COPY index.html ./
RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy only built frontend files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
