# docker

Install [docker](https://docs.docker.com/get-docker) and execute following commands.

```
docker build --tag ubuntu - < Dockerfile
docker run ubuntu tcc -v
```

## docker hub

Upload your tagged image to [docker hub](https://hub.docker.com/).

```
docker login -u <username>

docker tag ubuntu:latest <username>/ubuntu:latest
docker push <username>/ubuntu:latest
```