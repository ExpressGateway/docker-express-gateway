#!/bin/sh
set -e

if [ ! -e /var/lib/eg/gateway.config.yml ]; then
      echo >&2 "gateway.config.yml file not found in $PWD - copying now..."

			cat > /var/lib/eg/gateway.config.yml <<-'EOF'
        http:
          port: 8080
        admin:
          port: 9876
          hostname: localhost
        apiEndpoints:
          # see: http://www.express-gateway.io/docs/configuration/gateway.config.yml/apiEndpoints
        serviceEndpoints:
          # see: http://www.express-gateway.io/docs/configuration/gateway.config.yml/serviceEndpoints
        policies:
          - basic-auth
          - cors
          - expression
          - key-auth
          - log
          - oauth2
          - proxy
          - rate-limit
        pipelines:
          # see: https://www.express-gateway.io/docs/configuration/gateway.config.yml/pipelines

			EOF
fi

if [ ! -e /var/lib/eg/system.config.yml ]; then
      echo >&2 "system.config.yml file not found in $PWD - copying now..."

			cat > /var/lib/eg/system.config.yml <<-'EOF'
        # Core
        db:
          redis:
            emulate: true
            namespace: EG

        # plugins:
          # express-gateway-plugin-example:
          #   param1: 'param from system.config'

        crypto:
          cipherKey: sensitiveKey
          algorithm: aes256
          saltRounds: 10

        # OAuth2 Settings
        session:
          secret: keyboard cat
          resave: false
          saveUninitialized: false
        accessTokens:
          timeToExpiry: 7200000
        refreshTokens:
          timeToExpiry: 7200000
        authorizationCodes:
          timeToExpiry: 300000
			EOF
fi

exec "$@"
