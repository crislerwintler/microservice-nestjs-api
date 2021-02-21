FROM node:12.20.2-alpine3.10

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli@7.4.1

USER node

WORKDIR /home/node/app