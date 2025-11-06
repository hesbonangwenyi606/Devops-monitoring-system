FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install
COPY . .
EXPOSE 5000
CMD ["node", "src/index.js"]
