# Stage 1: build
FROM node:18-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
 
# Stage 2: final
FROM nginxinc/nginx-unprivileged:stable-alpine-slim AS final
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
