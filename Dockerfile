FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarn .yarnrc.yml ./
COPY .yarn/ ./.yarn/
COPY packages/tenant-appointment-booker/. ./packages/tenant-appointment-booker/

RUN yarn workspaces focus tenant-appointment-booker

ENV NEXT_PUBLIC_SERVER_BASE_URL http://127.0.0.1:3000

RUN yarn b build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn/ ./.yarn/
COPY --from=builder /app/packages/tenant-appointment-booker/ ./packages/tenant-appointment-booker/
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "yarn", "w", "tenant-appointment-booker", "start"]
