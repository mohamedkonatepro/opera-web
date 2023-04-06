FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG WORKSPACE_NAME
COPY package.json yarn.lock* .yarnrc.yml .yarn ./
COPY ./.yarn/ ./.yarn/
COPY ./packages/$WORKSPACE_NAME/package.json ./packages/$WORKSPACE_NAME/package.json
RUN yarn workspaces focus $WORKSPACE_NAME
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app

ARG WORKSPACE_NAME
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=deps /app/.yarn/ ./.yarn/
COPY ./packages/$WORKSPACE_NAME/ ./packages/$WORKSPACE_NAME/

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn w $WORKSPACE_NAME build

FROM base AS runner
WORKDIR /app

ARG WORKSPACE_NAME
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/$WORKSPACE_NAME/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/packages/$WORKSPACE_NAME/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/$WORKSPACE_NAME/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
