#!/bin/sh
set -e

if [ ! -e /var/lib/eg/gateway.config.yml ]; then
      echo >&2 "gateway.config.yml file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/bin/generators/gateway/templates/basic/config/gateway.config.yml \
         /var/lib/eg/gateway.config.yml
fi

if [ ! -e /var/lib/eg/models ]; then
      mkdir /var/lib/eg/models
fi

if [ ! -e /var/lib/eg/system.config.yml ]; then
      echo >&2 "system.config.yml file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/bin/generators/gateway/templates/basic/config/system.config.yml \
         /var/lib/eg/system.config.yml
fi

if [ ! -e /var/lib/eg/models/users.json ]; then
      echo >&2 "users.json file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/lib/config/models/users.json \
         /var/lib/eg/models/users.json
fi

if [ ! -e /var/lib/eg/models/applications.json ]; then
      echo >&2 "applications.json file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/lib/config/models/applications.json \
         /var/lib/eg/models/applications.json
fi

if [ ! -e /var/lib/eg/models/credentials.json ]; then
      echo >&2 "credentials.json file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/lib/config/models/credentials.json \
         /var/lib/eg/models/credentials.json
fi


exec "$@"
