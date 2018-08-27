# About this Repo

This is the Git repo of the Docker [official image](https://docs.docker.com/docker-hub/official_repos/) for [Express Gateway](https://express-gateway.io/).

## Release Process

The release process is documented on our [Wiki Page](https://github.com/ExpressGateway/express-gateway/wiki/Express-Gateway-Release-Process)

## Using this docker image

Obtain a local copy of the image:
```
docker pull expressgateway/express-gateway:latest
```

### Basic usage

Run a container from the image:
```
docker run -d -p 88:8080 expressgateway/express-gateway:latest
```
This starts a container and bind ports 88 on your host to port 8080 in the container.  You can now send requests to port 88.  However, you have not configured any applications, routes, etc yet.  You just started the default gateway configured inside the docker image.

### Persist configuration changes across container starts

In the container, the gateway configurations files are stored in /var/lib/eg/ .  If you make changes to these they will be lost when the container is removed or restarted.  To keep you configuration changes across container restarts, you must save them outside of the container. 

#### Using plain docker containers (e.g. not docker services)

Start the container so that it mounts a volume to a host directory where the configuration files will exist.  First, you should create a directory on your host where you want the configuration files to be stored.  For example:
```
mkdir -p /apps
```

Next, copy the default configuration from the docker image to the host directory using something similar to
```
docker run -d --name default-eg expressgateway/express-gateway:latest
docker cp default-eg:var/lib/eg /apps
```
Now, you should have the default configuration files in the /apps/eg directory on your host.  After modifying these as you wish, start the docker container so that it uses these files for the gateway configuration.  The configuration files saves in /apps/eg/ will persist across container restarts.
```
docker run -d --name express-gateway -p 88:8080 -v /apps/eg:/var/lib/eg expressgateway/express-gateway:latest
```
