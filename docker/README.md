## own container configuration (optional)

Install [docker](https://docs.docker.com/get-docker) and customize the configuration file `docker/Dockerfile`.

```
FROM <name>
RUN apt update && \
    apt install -y application1 application2 ...
```
  
`docker build -t <name> - < docker/Dockerfile`
  
Verify the installed applications.

```
docker run <application1> -h
docker run <application2> -h
...
```

Upload your tagged image to the registry [docker hub](https://hub.docker.com/).

```
docker login -u <username>

docker tag <name> <username>/<name>
docker push <username>/<name>
```