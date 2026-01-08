FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# --------------------
# Builder stage
# --------------------
FROM node:20-alpine AS builder
WORKDIR /app

ARG DATABASE_URL
ARG NEXTAUTH_SECRET

ENV DATABASE_URL=${DATABASE_URL:-"mysql://mysql:pass123@mysql:3306/mysqldb?sslmode=disabled"}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-"devsecret"}

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# full deps only for build
RUN npm ci

RUN npx prisma generate

COPY . .
RUN npm run build

# --------------------
# Runner (production)
# --------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# only prod deps
COPY --from=deps /app/node_modules ./node_modules

# prisma client only
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# next build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start"]
