FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
ARG APP_FOLDER
WORKDIR /app
ENV YARN_CACHE_FOLDER /app/.yarn/cache

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/
COPY packages/$APP_FOLDER/package.json ./packages/$APP_FOLDER/package.json
RUN yarn workspaces focus $APP_FOLDER

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG APP_FOLDER
COPY --from=deps /app/yarn.lock /app/.yarnrc.yml /app/package.json ./
COPY --from=deps /app/.yarn/ ./.yarn/
COPY --from=deps /app/node_modules/ ./node_modules/
COPY ./packages/$APP_FOLDER ./packages/$APP_FOLDER
RUN yarn workspace $APP_FOLDER build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ARG APP_FOLDER

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/$APP_FOLDER/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/packages/$APP_FOLDER/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/packages/$APP_FOLDER/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["yarn", "start"]
