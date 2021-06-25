# docker

Install [docker](https://docs.docker.com/get-docker) and execute following commands.

```
docker build -t ubuntu-tcc - < Dockerfile
docker run ubuntu-tcc tcc -v
```

## docker hub

Upload your tagged image to [docker hub](https://hub.docker.com/).

```
docker login -u <username>

docker tag ubuntu-tcc:latest <username>/ubuntu-tcc:latest
docker push <username>/ubuntu-tcc:latest
```