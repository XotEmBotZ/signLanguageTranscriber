FROM node:20-slim AS deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production --frozen-lockfile
RUN npm install --frozen-lockfile

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]