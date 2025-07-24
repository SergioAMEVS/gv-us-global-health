# Stage 1: Build the Next.js app
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Set env vars before build
ENV NEXT_PUBLIC_BASE_PATH=/express_app

COPY . .
RUN npm run build

# Stage 2: Serve the built app
FROM node:20 AS runner

WORKDIR /app

# Copy the standalone output
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static


EXPOSE 3000

CMD ["node", "server.js"]
