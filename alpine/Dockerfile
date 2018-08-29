FROM node:8-alpine

LABEL maintainer Vincenzo Chianese, vincenzo@express-gateway.io

ARG EG_VERSION 1.12.0

VOLUME /var/lib/eg

RUN yarn global add express-gateway@$EG_VERSION

RUN cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/bin/generators/gateway/templates/basic/config /var/lib/eg
RUN cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/lib/config/models /var/lib/eg/models

ENV NODE_ENV production
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/
ENV EG_CONFIG_DIR /var/lib/eg

ENV CHOKIDAR_USEPOLLING true

EXPOSE 8080 9876

CMD ["node", "-e", "require('express-gateway')().run();"]
