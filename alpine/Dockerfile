FROM node:8-alpine

LABEL maintainer Vincenzo Chianese, vincenzo@express-gateway.io

ARG EG_VERSION=1.10.2

VOLUME /var/lib/eg

ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/
ENV NODE_ENV production
ENV EG_CONFIG_DIR /var/lib/eg
ENV CHOKIDAR_USEPOLLING true

RUN yarn global add express-gateway@$EG_VERSION

COPY config /var/lib/eg

EXPOSE 8080 9876

CMD ["node", "-e", "require('express-gateway')().run();"]
