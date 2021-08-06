# docker

Install [docker](https://docs.docker.com/get-docker) and execute following commands.

```
docker build --tag <name> - < Dockerfile
docker run <name> tcc -v
```

## docker hub

Upload your tagged image to [docker hub](https://hub.docker.com/).

```
docker login -u <username>

docker tag <name> <username>/<name>
docker push <username>/<name>
```
