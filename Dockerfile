# Stage 1: Build TypeScript
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript ke JavaScript (output ke /dist)
RUN npx tsc

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /app

# Copy only built files and dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy hasil build dari stage builder
COPY --from=builder /app/dist ./dist

# Set environment variable
ENV NODE_ENV=production

# Port yang digunakan (ubah sesuai app)
EXPOSE 3000

# Jalankan hasil build
CMD ["node", "dist/index.js"]
