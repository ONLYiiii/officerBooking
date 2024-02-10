FROM node:18.17-alpine3.18 AS stage_build
WORKDIR /app

COPY .npmrc ./
COPY ./package*.json ./

ARG NPM_REPOSITORY
ARG NPM_TOKEN_READONLY

RUN export NPM_REPOSITORY=$NPM_REPOSITORY \
    && export NPM_TOKEN_READONLY=$NPM_TOKEN_READONLY

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.25-alpine-slim

RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
    && apk del tzdata \
    && echo "Asia/Bangkok" > /etc/timezone

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d /etc/nginx/conf.d

COPY --from=stage_build /app/dist /usr/share/nginx/html
