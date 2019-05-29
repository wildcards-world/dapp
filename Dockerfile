FROM node:10.15.3-alpine

WORKDIR /app

RUN apk update
RUN apk upgrade
RUN apk add git python make g++

ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json

RUN npm install

ADD . /app
