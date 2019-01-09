FROM node:10-alpine

LABEL maintainer Vincenzo Chianese, vincenzo@express-gateway.io

ARG EG_VERSION=<%= egVersion %>

RUN yarn global add express-gateway@$EG_VERSION && yarn cache clean

ENV NODE_ENV production
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/
ENV EG_CONFIG_DIR /var/lib/eg

ENV CHOKIDAR_USEPOLLING true

VOLUME /var/lib/eg

EXPOSE 8080 9876

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "-e", "require('express-gateway')().run();"]
