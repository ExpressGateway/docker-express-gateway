#!/bin/sh
set -e

if [ ! -e /var/lib/eg/gateway.config.yml ]; then
      echo >&2 "gateway.config.yml file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/bin/generators/gateway/templates/basic/config/gateway.config.yml
         /var/lib/eg/gateway.config.yml
fi

if [ ! -e /var/lib/eg/system.config.yml ]; then
      echo >&2 "system.config.yml file not found in $PWD - copying now..."

      cp /usr/local/share/.config/yarn/global/node_modules/express-gateway/bin/generators/gateway/templates/basic/config/system.config.yml
         /var/lib/eg/system.config.yml
fi

exec "$@"
