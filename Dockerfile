FROM node:lts AS base

WORKDIR /app

# yarn install
COPY package.json yarn.lock ./

# dev stage
FROM base AS dev
RUN yarn install --frozen-lockfile
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# prod stage
FROM base AS prod
# install dependencies only for production
RUN yarn install --frozen-lockfile --production
# install nest cli
RUN yarn global add @nestjs/cli
ENV NODE_ENV=production
COPY . .
RUN yarn build
CMD ["yarn", "start:prod"]
