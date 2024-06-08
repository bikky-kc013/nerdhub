FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

COPY . . 